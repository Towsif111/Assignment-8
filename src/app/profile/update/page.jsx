"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient, useSession } from "@/lib/auth-client";

export default function UpdateProfilePage() {
	const { data: session } = useSession();
	const user = session?.user;
	const [name, setName] = useState(user?.name || "");
	const [image, setImage] = useState(user?.image || "");
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();
		setIsSaving(true);
		setError("");

		const { error: updateError } = await authClient.updateUser({
			name: name.trim() || undefined,
			image: image.trim() || undefined,
		});

		if (updateError) {
			setError(updateError.message || "Failed to update profile.");
			setIsSaving(false);
			return;
		}

		window.location.assign("/profile");
	};

	if (!user) {
		return (
			<main className="flex flex-1 items-center justify-center px-4 py-12">
				<div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
					<h1 className="text-2xl font-semibold text-slate-900">Update profile</h1>
					<p className="mt-2 text-slate-600">Please log in to update your profile.</p>
					<Link href="/login" className="mt-5 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
						Login
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className="flex flex-1 items-center justify-center px-4 pt-16 pb-12">
			<div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h1 className="text-2xl font-semibold text-slate-900">Update profile</h1>
						<p className="mt-2 text-sm text-slate-600">Update your name or avatar image.</p>
					</div>
					<Link href="/profile" className="text-sm font-medium text-slate-600 hover:text-slate-800">
						Back
					</Link>
				</div>

				<form onSubmit={onSubmit} className="mt-6 space-y-4">
					<label className="block text-sm font-medium text-slate-700">
						Name
						<input
							type="text"
							value={name}
							onChange={(event) => setName(event.target.value)}
							className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-slate-400 focus:outline-none"
							placeholder="Your name"
						/>
					</label>

					<label className="block text-sm font-medium text-slate-700">
						Image URL
						<input
							type="text"
							value={image}
							onChange={(event) => setImage(event.target.value)}
							className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-slate-400 focus:outline-none"
							placeholder="https://example.com/avatar.jpg"
						/>
					</label>

					{error ? <p className="text-sm text-red-600">{error}</p> : null}

					<div className="flex items-center gap-3">
						<button
							type="submit"
							disabled={isSaving}
							className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed"
						>
							{isSaving ? "Saving..." : "Update profile"}
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}
