import { Link } from "react-router-dom";

function MenuCard({ item }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="h-80 overflow-hidden bg-slate-100">
        <img
          src={
            item.image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80"
          }
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-black text-slate-900">{item.name}</h3>
          <span className="rounded-full bg-[#fef2f2] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#b61f26]">
            {item.category?.name || item.category || "Menu"}
          </span>
        </div>

        <p className="text-sm leading-6 text-slate-600">{item.description}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-3xl font-black text-[#b61f26]">
            ${Number(item.price).toFixed(2)}
          </span>
          <div className="flex items-center gap-2">
            <Link
              to={`/product/${item._id}`}
              className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-slate-400"
            >
              Details
            </Link>
            <button className="rounded-full bg-[#b61f26] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#8f1a20]">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MenuCard;
