"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function TileDetailsPage() {
	const params = useParams();
	const tileId = useMemo(() => (params?.id ? String(params.id) : ""), [params]);
	const [tile, setTile] = useState(null);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();
	const user = session?.user;

	const creator = tile?.creator || "TileScape Studio";
	const styleDescription = tile?.styleDescription || tile?.description || "";
	const tags = (tile?.tags || [tile?.category, tile?.material]).filter(Boolean);

	useEffect(() => {
		if (!tileId) return;
		setLoading(true);
		fetch("/data/tiles.json")
			.then((res) => res.json())
			.then((data) => {
				const match = data.find((item) => item.id === tileId);
				setTile(match || null);
				setLoading(false);
			})
			.catch(() => {
				setTile(null);
				setLoading(false);
			});
	}, [tileId]);

	if (!user) {
		return (
			<main className="flex-1 px-4 pb-12 pt-6 sm:px-6 lg:px-8">
				<div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
					<h1 className="text-2xl font-semibold text-slate-900">Please log in</h1>
					<p className="mt-2 text-slate-600">Log in to view tile details.</p>
					<Link
						href="/login"
						className="mt-5 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
					>
						Go to login
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className="flex-1 px-4 pb-12 pt-6 sm:px-6 lg:px-8">
			<div className="mx-auto w-full max-w-4xl">
				<Link
					href="/tiles"
					className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
				>
					Back to tiles
				</Link>

				{loading ? (
					<div className="mt-10 text-center">
						<p className="text-slate-600">Loading tile details...</p>
					</div>
				) : tile ? (
					<div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
						<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
							<div className="relative aspect-[4/3] w-full bg-linear-to-br from-slate-100 to-slate-200">
								<img src={tile.image} alt={tile.title} className="h-full w-full object-cover" />
							</div>
						</div>
						<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
							<h1 className="text-2xl font-semibold text-slate-900">{tile.title}</h1>
							<p className="mt-3 text-slate-600">{styleDescription}</p>
							<div className="mt-5 text-3xl font-bold text-slate-900">${tile.price}</div>

							<div className="mt-6 space-y-3 text-sm text-slate-700">
								<p><span className="font-semibold text-slate-900">Creator:</span> {creator}</p>
								<p><span className="font-semibold text-slate-900">Style:</span> {styleDescription}</p>
								<p><span className="font-semibold text-slate-900">Dimensions:</span> {tile.dimensions}</p>
								<p><span className="font-semibold text-slate-900">Availability:</span> {tile.inStock ? "In stock" : "Out of stock"}</p>
							</div>

							{tags.length ? (
								<div className="mt-6">
									<p className="text-sm font-semibold text-slate-900">Tags</p>
									<div className="mt-3 flex flex-wrap gap-2">
										{tags.map((tag) => (
											<span
												key={tag}
												className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							) : null}
						</div>
					</div>
				) : (
					<div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-700 shadow-sm">
						<p className="text-lg font-semibold text-slate-900">Tile not found</p>
						<p className="mt-2 text-sm text-slate-600">Please check the tile ID or go back to the tiles list.</p>
					</div>
				)}
			</div>
		</main>
	);
}
