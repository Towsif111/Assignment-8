"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
	const { data: session } = useSession();

	const user = session?.user;
	const userImage = user?.image || user?.photo || user?.avatar || user?.picture;
	const normalizedImage = typeof userImage === "string" ? userImage.replace(/\s+/g, "") : null;
	const isDataImage = typeof normalizedImage === "string" && normalizedImage.startsWith("data:image/");
	const isHttpImage = typeof normalizedImage === "string" && /^https?:\/\//i.test(normalizedImage);
	const resolvedImage = isDataImage || isHttpImage ? normalizedImage : null;

	if (!user) {
		return (
			<main className="flex flex-1 items-center justify-center px-4 py-12">
				<div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
					<h1 className="text-2xl font-semibold text-slate-900">My Profile</h1>
					<p className="mt-2 text-slate-600">Please log in to view your profile.</p>
					<Link href="/login" className="mt-5 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
						Login
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className="flex flex-1 items-center justify-center px-4 py-12">
			<div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
				<div className="flex items-center gap-4">
					{resolvedImage ? (
						isDataImage ? (
							<img
								src={resolvedImage}
								alt={user.name || "User"}
								className="h-16 w-16 rounded-full object-cover"
							/>
						) : (
							<Image
								src={resolvedImage}
								alt={user.name || "User"}
								width={64}
								height={64}
								unoptimized
								className="h-16 w-16 rounded-full object-cover"
							/>
						)
					) : (
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-lg font-semibold text-slate-700">
							{(user.name || user.email || "U").charAt(0).toUpperCase()}
						</div>
					)}
					<div>
						<h1 className="text-2xl font-semibold text-slate-900">My Profile</h1>
						<p className="text-slate-600">{user.name || "No name found"}</p>
					</div>
				</div>

				<div className="mt-6 space-y-2 rounded-xl bg-slate-50 p-4 text-slate-700">
					<p><span className="font-medium text-slate-900">Email:</span> {user.email || "No email"}</p>
					<p><span className="font-medium text-slate-900">Name:</span> {user.name || "No name"}</p>
				</div>

				<Link href="/profile/update" className="mt-6 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
					Update profile
				</Link>
			</div>
		</main>
	);
}