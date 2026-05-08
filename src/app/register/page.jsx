"use client";

import React, { useState } from "react";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const Toast = ({ message, tone }) => {
    if (!message) return null;

    const toneStyles =
        tone === "success"
            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
            : "border-rose-200 bg-rose-50 text-rose-800";

    return (
        <div
            role="alert"
            className={`mb-4 rounded-xl border px-4 py-3 text-sm shadow-sm ${toneStyles}`}
        >
            {message}
        </div>
    );
};

const SignUpPage = () => {
    const [toast, setToast] = useState({ tone: "", message: "" });
    const [showPassword, setShowPassword] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        console.log("Form submitted with:", userData);

        const normalizedPhoto = userData.photo ? String(userData.photo).trim() : "";

        const { data, error } = await authClient.signUp.email({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            image: normalizedPhoto || undefined,
            callbackURL: "/",
        });

        console.log("Sign up response:", { data, error });
        if (error) {
            setToast({ tone: "error", message: error.message || "Registration failed" });
            return;
        }

        const { data: signInData, error: signInError } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            rememberMe: true,
            callbackURL: "/",
        });

        if (signInError) {
            setToast({
                tone: "success",
                message: "Registration complete. Please log in to continue.",
            });
            setTimeout(() => window.location.assign("/login"), 800);
            return;
        }

        setToast({ tone: "success", message: "Registration successful. Redirecting..." });
        const destination = signInData?.url || data?.url || "/";
        setTimeout(() => window.location.assign(destination), 800);
    };

    return (
        <div className="flex items-center justify-center py-8 px-2">
            <div className="w-full max-w-md">
                <h1 className="mb-1 text-center text-2xl font-semibold text-slate-800">Create an account</h1>
                <Toast message={toast.message} tone={toast.tone} />
                <Form className="flex w-full flex-col gap-1" render={(props) => <form {...props} />} onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="name"
                        type="text"
                        validate={(value) => {
                            if (!value || value.trim().length < 2) return "Please enter your name";
                            return null;
                        }}
                    >
                        <Label>Name</Label>
                        <Input placeholder="Your full name" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }

                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="Your Email" />
                        <FieldError />
                    </TextField>

                    <TextField name="photo" type="text">
                        <Label>Photo URL</Label>
                        <Input placeholder="Enter photo URL" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }

                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <div className="relative w-full">
                            <Input className="w-full pr-12" placeholder="Enter your password" />
                            <button
                                type="button"
                                onClick={() => setShowPassword((current) => !current)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <i
                                    className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <Description>Must be at least 8 characters</Description>
                        <FieldError />
                    </TextField>

                    <div className="flex justify-center gap-2 mt-1">
                        <Button type="submit">Register</Button>
                        <Button type="reset" variant="secondary">
                            Reset
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SignUpPage;
