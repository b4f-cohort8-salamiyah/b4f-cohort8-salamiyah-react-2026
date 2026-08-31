import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";

function ProductDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await api.getMenuById(id);
        setItem(response.data);
      } catch (err) {
        setError(err.message || "Unable to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f1ee]">
        <div className="h-24 w-24 animate-pulse rounded-full bg-[#b61f26]/20" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f1ee] p-6">
        <div className="max-w-lg rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-soft">
          <h1 className="text-3xl font-black text-slate-900">
            Product not found
          </h1>
          <p className="mt-3 text-slate-600">
            {error || "The requested item is unavailable."}
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-[#b61f26] px-5 py-3 text-sm font-bold text-white"
          >
            Back to menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f1ee] text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-6 inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
        >
          ← Back to menu
        </Link>

        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="h-full min-h-[360px] bg-slate-100">
              <img
                src={
                  item.image ||
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80"
                }
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 md:p-10">
              <div className="mb-4 inline-flex rounded-full bg-[#fef2f2] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#b61f26]">
                {typeof item.category === "string"
                  ? item.category
                  : item.category?.name || "Menu"}
              </div>
              <h1 className="text-4xl font-black text-slate-900">
                {item.name}
              </h1>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-4xl font-black text-[#b61f26]">
                  ${Number(item.price || 0).toFixed(2)}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    item.available === false
                      ? "bg-slate-200 text-slate-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.available === false ? "Unavailable" : "Available"}
                </span>
              </div>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {item.description}
              </p>

              <div className="mt-8">
                <h2 className="text-xl font-black text-slate-900">
                  Ingredients
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(item.ingredients || []).map((ingredient) => (
                    <span
                      key={ingredient}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button className="rounded-full bg-[#b61f26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#8f1a20]">
                  Add to cart
                </button>
                <button className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-400">
                  Order now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
