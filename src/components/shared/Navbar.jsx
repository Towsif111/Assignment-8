"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";

const Navbar = () => {
	const { data: session } = useSession();
	const user = session?.user;
	const userImage = user?.image || user?.photo || user?.avatar || user?.picture;
	const normalizedImage = typeof userImage === "string" ? userImage.replace(/\s+/g, "") : null;
	const isDataImage = typeof normalizedImage === "string" && normalizedImage.startsWith("data:image/");
	const isHttpImage = typeof normalizedImage === "string" && /^https?:\/\//i.test(normalizedImage);
	const resolvedImage = isDataImage || isHttpImage ? normalizedImage : null;
	
	return (
		<header className="w-full border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
			<div className="grid h-19 w-full grid-cols-[auto_1fr_auto] items-center gap-4">
				<div className="flex items-center">
					<Link href="/" aria-label="TileScape home" className="text-2xl font-extrabold tracking-[-0.04em] text-red-600">
						<span className="text-slate-900">Tiles</span>
						<span className="text-red-600">Gallery</span>
					</Link>
				</div>

				<div className="flex justify-center">
					<nav className="flex items-center gap-4 sm:gap-6 lg:gap-10">
						<Link href="/" className="rounded-full px-4 py-2 text-base font-medium transition text-slate-600 hover:text-slate-800 sm:text-lg">
							Home
						</Link>
						<Link href="/tiles" className="rounded-full px-4 py-2 text-base font-medium transition text-slate-600 hover:text-slate-800 sm:text-lg">
							All Tiles
						</Link>
						<Link href="/profile" className="rounded-full px-4 py-2 text-base font-medium transition text-slate-600 hover:text-slate-800 sm:text-lg">
							My Profile
						</Link>
					</nav>
				</div>

				<div className="flex items-center justify-end gap-3">
					{user ? (
						<div className="flex items-center gap-3">
							{resolvedImage ? (
								isDataImage ? (
									<img
										src={resolvedImage}
										alt={user.name || "User"}
										className="h-9 w-9 rounded-full object-cover"
									/>
								) : (
									<Image
										src={resolvedImage}
										alt={user.name || "User"}
										width={36}
										height={36}
										unoptimized
										className="h-9 w-9 rounded-full object-cover"
									/>
								)
							) : (
								<div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
									{(user.name || user.email || "U").charAt(0).toUpperCase()}
								</div>
							)}
							<span className="text-sm font-medium text-slate-700">{user.name || user.email}</span>
							<button onClick={() => signOut({ callbackURL: "/" })} className="rounded-full border border-slate-300 px-4 py-2 transition hover:bg-slate-50">
								Sign out
							</button>
						</div>
					) : (
						<Link href="/login" className="rounded-full border border-slate-300 px-4 py-2 transition hover:bg-slate-50">
							Login
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Navbar;

