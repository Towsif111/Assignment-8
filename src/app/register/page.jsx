"use client";

import React from "react";
import { } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

function RegisterForm() {
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
    };

    return (
        <Form className="flex w-96 flex-col gap-4" render={(props) => <form {...props} data-custom="foo" />} onSubmit={onSubmit}>
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

            <div className="flex gap-2">
                <Button type="submit">
                    Submit
                </Button>
                <Button type="reset" variant="secondary">
                    Reset
                </Button>
            </div>
        </Form>
    );
}

export default function RegisterPage() {
    return (
        <main className="flex-1 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                <h1 className="mb-6 text-2xl font-semibold text-slate-800">Create an account</h1>
                <RegisterForm />
            </div>
        </main>
    );
}