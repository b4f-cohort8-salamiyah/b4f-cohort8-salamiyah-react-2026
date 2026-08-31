import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import MenuCard from "./components/MenuCard";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetail from "./pages/ProductDetail";
import { api } from "./services/api";

function HomePage() {
  const [categories, setCategories] = useState(["All"]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [menuResponse, categoriesResponse] = await Promise.all([
          api.getMenu(),
          api.getCategories(),
        ]);

        const menuItems = menuResponse.data || [];
        const categoryList = categoriesResponse.data || [];

        setProducts(menuItems);
        setCategories([
          "All",
          ...categoryList.map((category) => category.name),
        ]);
      } catch (error) {
        console.error("Failed to load menu:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => {
          const categoryName =
            typeof product.category === "string"
              ? product.category
              : product.category?.name;
          return categoryName === selectedCategory;
        });

  return (
    <div className="min-h-screen bg-[#f4f1ee] text-slate-900">
      <Navbar />

      <main id="home" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[30px] border border-slate-200 bg-white/80 p-6 shadow-soft backdrop-blur-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fef3c7] px-3 py-1 text-sm font-semibold text-[#7c4a00]">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                Fresh from the kitchen
              </p>
              <h1 className="max-w-xl text-4xl font-black leading-tight text-slate-900 md:text-5xl">
                High-quality meals for every mood.
              </h1>
            </div>

            <div className="flex min-w-[260px] flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === category
                      ? "border-[#b61f26] bg-[#b61f26] text-white shadow-md"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-black text-slate-900">
              Featured Menu
            </h2>
            <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">
              View all
            </button>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[420px] animate-pulse rounded-[28px] bg-slate-200"
                />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
              No menu items are available in this category yet.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <MenuCard key={product._id || product.id} item={product} />
              ))}
            </div>
          )}
        </section>

        <section
          id="about"
          className="mt-16 rounded-[30px] bg-[#fef8f0] p-8 shadow-soft"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-[#b61f26]">
                About us
              </p>
              <h3 className="text-3xl font-black text-slate-900">
                Fresh food, warm atmosphere, and memorable taste.
              </h3>
            </div>
            <p className="text-slate-600 leading-8">
              Odessye blends premium ingredients, handmade recipes, and a
              welcoming ambiance to create a dining experience that feels both
              modern and comforting.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
