"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const TilesPage = () => {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/tiles.json")
      .then((res) => res.json())
      .then((data) => {
        setTiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load tiles:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex-1 px-4 pb-12 pt-4 sm:px-6 lg:px-8">
      <section className="w-full">
        <div className="mb-6 px-4 sm:px-5">
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">All Tiles</h1>
        </div>

        <div className="px-4 sm:px-5">
          {loading ? (
            <div className="mt-10 text-center">
              <p className="text-slate-600">Loading tiles...</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tiles.map((tile) => (
                <article
                  key={tile.id}
                  className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative h-48 w-full bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                    <img src={tile.image} alt={tile.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-semibold text-slate-800">{tile.title}</h2>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">{tile.description}</p>
                    <div className="mt-4">
                      <span className="text-xl font-bold text-slate-900">${tile.price}</span>
                    </div>
                    <Link
                      href={`/tiles/${tile.id}`}
                      className="mt-5 w-full inline-flex items-center justify-center rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default TilesPage;
