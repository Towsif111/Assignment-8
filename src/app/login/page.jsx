"use client";

import React from "react";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
    const onSubmit = async(e) => {
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
            alert(error.message || "Login failed");
            return;
        }

        if (data?.url) {
            window.location.assign(data.url);
            return;
        }

        window.location.assign("/");
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
                type="password"
                validate={(value) => {
                    if (value.length < 8) return "Password must be at least 8 characters";
                    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                    if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                    return null;
                }}
            >
                <Label>Password</Label>
                <Input placeholder="Enter your password" />
                <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
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
    const handleGoogleSignIn = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/"
        });

        if (error) {
            alert(error.message || "Google sign-in failed");
            return;
        }

        if (data?.url) {
            window.location.assign(data.url);
            return;
        }

        window.location.assign("/");
    };

    return (
        <main className="flex-1 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                <h1 className="mb-6 text-2xl font-semibold text-slate-800">Sign in to TileScape</h1>
                <SignInPage />
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