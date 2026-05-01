"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<header className="w-full px-6 py-4">
			<div className="mx-auto max-w-6xl relative">
				<div className="rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-lg p-4">
					<div className="flex items-center justify-between relative">
						{/* Left: Logo */}
						<div className="flex items-center z-20">
							<Link href="/" aria-label="TileScape home" className="text-2xl font-extrabold text-slate-800">
								TileScape
							</Link>
						</div>

						{/* Centre: navigation (visually centered) */}
						<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
							<nav className="pointer-events-auto flex items-center gap-6">
								<Link
									href="/"
									className="px-4 py-2 rounded-full bg-slate-800 text-white shadow-sm"
									aria-current="page"
								>
									Home
								</Link>
								<Link href="/tiles" className="text-slate-600 hover:text-slate-800">
									All Tiles
								</Link>
								<Link href="/profile" className="text-slate-600 hover:text-slate-800">
									My Profile
								</Link>
							</nav>
						</div>

						{/* Right: Login / Profile + Logout */}
						<div className="flex items-center gap-3 z-20">
							{!loggedIn ? (
								<button
									onClick={() => setLoggedIn(true)}
									className="rounded-full px-4 py-2 border border-slate-300 hover:bg-slate-50"
								>
									Login
								</button>
							) : (
								<>
									<Link href="/profile" className="text-slate-700">
										Profile
									</Link>
									<button
										onClick={() => setLoggedIn(false)}
										className="rounded-full px-4 py-2 border border-slate-300 hover:bg-slate-50"
									>
										Logout
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

