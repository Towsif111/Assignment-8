const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    iconClass: "fa-brands fa-instagram",
  },
  {
    label: "X",
    href: "https://x.com",
    iconClass: "fa-brands fa-square-x-twitter",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    iconClass: "fa-brands fa-facebook",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">TileScape</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
            Discover premium tiles, curated finishes, and inspiration for every space.
          </p>
        </div>

        <div className="justify-self-center text-center lg:justify-self-center">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
            Social Media
          </h3>
          <ul className="mt-4 flex items-center justify-center gap-6 text-sm text-slate-600">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
                  aria-label={link.label}
                >
                  <i className={`${link.iconClass} text-lg`} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pl-8 xl:pl-12">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
            Contact Us
          </h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>Email: support@tilesgallery.com</p>
            <p>Phone: +1 (555) 012-3456</p>
            <p>Address: 24 Design Avenue, New York, NY</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-slate-200 pt-5 text-center text-xs text-slate-500">
        © 2026 TileScape. All rights reserved.
      </div>
    </footer>
  );
}
