"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import NewsArrival from "../components/shared/NewsArrival";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch("/data/tiles.json")
      .then((res) => res.json())
      .then((data) => setFeatured(data.slice(0, 4)))
      .catch((err) => console.error("Failed to load tiles:", err));
  }, []);

  return (
    <main className="flex-1 px-4 pb-8 pt-2 sm:px-6 lg:px-8">
      <section className="w-full">
        <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-[#f1cda9] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.28em] text-slate-700 shadow-sm sm:px-5 sm:py-2 sm:text-sm">
              Tiles Gallery
            </span>

            <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-[-0.04em] text-slate-800 sm:text-5xl lg:text-6xl">
              Discover Your Perfect Aesthetic
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              From minimalist geometry to hand-crafted surfaces, explore patterns that redefine your space.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/tiles"
                className="inline-flex items-center justify-center rounded-full bg-[#29485f] px-5 py-3 text-base font-semibold text-white shadow-[0_14px_30px_rgba(41,72,95,0.28)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#1f3a4d] sm:px-6 sm:py-3.5"
              >
                Browse Now
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:px-5">
          <NewsArrival />
        </div>

        <div className="mt-12 px-4 sm:px-5">
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featured.map((tile) => (
              <article
                key={tile.id}
                className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-40 w-full overflow-hidden rounded-lg bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-slate-500">{tile.material}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-800">{tile.title}</h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{tile.description}</p>
                <div className="mt-4">
                  <span className="text-xl font-bold text-slate-900">${tile.price}</span>
                </div>
                <Link
                  href={`/tiles/${tile.id}`}
                  className="mt-4 w-full inline-flex items-center justify-center rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  View Details
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
