function Footer() {
  return (
    <footer id="contact" className="mt-16 bg-[#1d1d1d] text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b61f26] text-xl font-black text-white">
                O
              </div>
              <div>
                <p className="text-2xl font-black text-white">Odessye</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  Cafe & Restaurant
                </p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-7 text-slate-300">
              A modern cafe experience with rich flavors, warm hospitality, and
              unforgettable dining moments.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-black text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <a href="#home" className="hover:text-[#f5d67a]">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#f5d67a]">
                  Menu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#f5d67a]">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#f5d67a]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-black text-white">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>📍 123 Flavor Street, Downtown</li>
              <li>📞 +966 555 123 456</li>
              <li>✉️ hello@odessye.com</li>
              <li>🕒 Mon - Sun: 9:00 AM - 11:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
          © 2026 Odessye Cafe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
