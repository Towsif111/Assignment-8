import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex flex-1 items-center justify-center px-6 py-28">
			<div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-14 text-center shadow-sm">
				<p className="text-4xl font-semibold uppercase tracking-[0.6em] text-red-500">404</p>
				<h1 className="mt-4 text-4xl font-semibold text-slate-900">Page not found</h1>
				<p className="mt-3 text-lg text-slate-600">The page you are looking for doesn&apos;t exist.</p>
				<div className="mt-9 flex items-center justify-center">
					<Link href="/" className="rounded-full bg-red-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-red-500">
						Go home
					</Link>
				</div>
			</div>
		</main>
	);
}
