"use client";

import Link from "next/link";
import { useState } from "react";

import { usePathname } from "next/navigation";

export default function Navbar() {
	const [loggedIn, setLoggedIn] = useState(false);
	const pathname = usePathname();

	return (
		<header className="w-full border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
			<div className="grid h-19 w-full grid-cols-[auto_1fr_auto] items-center gap-4">
					<div className="flex items-center">
						<Link href="/" aria-label="TileScape home" className="text-2xl font-extrabold tracking-[-0.04em] text-red-600">
							<span className="text-slate-900">Tiles</span><span className="text-red-600">Gallery</span>
						</Link>
					</div>

					<div className="flex justify-center">
						<nav className="flex items-center gap-4 sm:gap-6 lg:gap-10">
							<Link
								href="/"
								className={`rounded-full px-4 py-2 text-sm font-medium transition ${pathname === "/" ? "bg-slate-800 text-white shadow-sm" : "text-slate-600 hover:text-slate-800"}`}
							>
								Home
							</Link>
							<Link href="/tiles" className={`rounded-full px-4 py-2 text-sm font-medium transition ${pathname === "/tiles" ? "bg-slate-800 text-white shadow-sm" : "text-slate-600 hover:text-slate-800"}`}>
								All Tiles
							</Link>
							<Link href="/profile" className={`rounded-full px-4 py-2 text-sm font-medium transition ${pathname === "/profile" ? "bg-slate-800 text-white shadow-sm" : "text-slate-600 hover:text-slate-800"}`}>
								My Profile
							</Link>
							</nav>
					</div>

				
					<div className="flex items-center justify-end gap-3">
						{!loggedIn ? (
							<Link
								href="/login"
								className="rounded-full border border-slate-300 px-4 py-2 transition hover:bg-slate-50"
							>
								Login
							</Link>
						) : (
							<>
								<Link href="/profile" className="text-slate-700 transition hover:text-slate-900">
									Profile
								</Link>
								<button
									onClick={() => setLoggedIn(false)}
									className="rounded-full border border-slate-300 px-4 py-2 transition hover:bg-slate-50"
								>
								Logout
								</button>
							</>
						)}
					</div>
			</div>
		</header>
	);
}

