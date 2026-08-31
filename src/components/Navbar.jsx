import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-[#b61f26] text-white shadow-lg shadow-red-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/70 bg-white/10 text-xl font-black transition hover:scale-105">
              O
            </div>
            <div>
              <p className="text-2xl font-black tracking-wide">Odessye</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-red-100">
                Cafe & Restaurant
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
            <a href="#home" className="transition hover:text-[#f5d67a]">
              الرئيسية
            </a>
            <a href="#menu" className="transition hover:text-[#f5d67a]">
              القائمة
            </a>
            <a href="#about" className="transition hover:text-[#f5d67a]">
              من نحن
            </a>
            <a href="#contact" className="transition hover:text-[#f5d67a]">
              تواصل
            </a>
          </nav>

          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            <span className="rounded-full border border-white/30 bg-white/10 px-3 py-2">
              Open Today
            </span>
            <span className="rounded-full border border-white/30 bg-white/10 px-3 py-2">
              9:00 AM - 11:00 PM
            </span>
            <Link
              to="/admin"
              className="rounded-full bg-[#f2b747] px-5 py-2.5 text-[#3a1b00] transition hover:bg-[#f5c662]"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
