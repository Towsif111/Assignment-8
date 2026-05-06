"use client";

import React from "react";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        console.log("Form submitted with:", userData);

        const { data, error } = await authClient.signUp.email({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            image: userData.photo,
            callbackURL: "/",
        });

        console.log("Sign up response:", { data, error });
        if (error) {
            alert("Error signing up: " + error.message);
        }
        if (data) {
            alert("Sign up successful! Please check your email to verify your account.");
        }
    };

    return (
        <div className="flex items-center justify-center py-8 px-2">
            <div className="w-full max-w-md">
                <h1 className="mb-1 text-center text-2xl font-semibold text-slate-800">Create an account</h1>
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
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }

                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
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
