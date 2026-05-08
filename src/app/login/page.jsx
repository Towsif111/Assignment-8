"use client";

import React, { useState } from "react";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
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

const SignInPage = ({ onToast }) => {
    const [showPassword, setShowPassword] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        console.log("Form submitted with:",userData);

        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            rememberMe: true,
            callbackURL: '/'
        });
        console.log("Sign in response:", { data, error });

        if (error) {
            onToast({ tone: "error", message: error.message || "Login failed" });
            return;
        }

        onToast({ tone: "success", message: "Login successful. Redirecting..." });
        const destination = data?.url || "/";
        setTimeout(() => window.location.assign(destination), 800);
    };

    return (
        <Form className="flex w-96 flex-col gap-4" render={(props) => <form {...props} />} onSubmit={onSubmit}>
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
                <Input placeholder="john@example.com" />
                <FieldError />
            </TextField>

            <TextField
                isRequired
                minLength={8}
                name="password"
                type={showPassword ? "text" : "password"}
                validate={(value) => {
                    if (value.length < 8) return "Password must be at least 8 characters";
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

            <div className="flex gap-2">
                <Button type="submit">
                    Login
                </Button>
                <Button type="reset" variant="secondary">
                    Reset
                </Button>
            </div>
        </Form>
    );
};

export default function LoginPage() {
    const [toast, setToast] = useState({ tone: "", message: "" });
    const handleGoogleSignIn = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/"
        });

        if (error) {
            setToast({ tone: "error", message: error.message || "Google sign-in failed" });
            return;
        }

        setToast({ tone: "success", message: "Login successful. Redirecting..." });
        const destination = data?.url || "/";
        setTimeout(() => window.location.assign(destination), 800);
    };

    return (
        <main className="flex-1 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                <h1 className="mb-6 text-2xl font-semibold text-slate-800">Sign in to TileScape</h1>
                <Toast message={toast.message} tone={toast.tone} />
                <SignInPage onToast={setToast} />
                <Button type="button" variant="bordered" className="mt-4 w-full animate__animated animate__flash" onPress={handleGoogleSignIn}>
                    <i className="fa-brands fa-google text-2xl" aria-hidden="true" />
                    <span className="ml-2">Login with Google</span>
                </Button>
                <p className="mt-4 text-center text-slate-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </main>
    );
}