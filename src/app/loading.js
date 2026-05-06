export default function Loading() {
	return (
		<main className="flex min-h-[60vh] items-center justify-center px-4">
			<div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700" />
				<p className="text-sm font-medium text-slate-700">Loading...</p>
			</div>
		</main>
	);
}
