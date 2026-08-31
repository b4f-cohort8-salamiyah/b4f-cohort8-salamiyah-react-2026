import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  image: "",
  category: "",
  ingredients: "",
  available: true,
  featured: false,
};

const getStoredToken = () => localStorage.getItem("odessye_admin_token");

function AdminDashboard() {
  const [token, setToken] = useState(getStoredToken);
  const [user, setUser] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loginForm, setLoginForm] = useState({
    email: "admin@odessye.com",
    password: "admin123",
  });
  const [formState, setFormState] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const loadDashboard = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const [menuRes, categoryRes, ordersRes, userRes] = await Promise.all([
        api.getMenu(),
        api.getCategories(),
        api.getOrders(token),
        api.getCurrentUser(token),
      ]);

      setMenuItems(menuRes.data || []);
      setCategories(categoryRes.data || []);
      setOrders(ordersRes.data || []);
      setUser(userRes.data || null);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load dashboard data");
      localStorage.removeItem("odessye_admin_token");
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [token]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.login(loginForm);
      localStorage.setItem("odessye_admin_token", response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
      setSuccess("Login successful.");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("odessye_admin_token");
    setToken(null);
    setUser(null);
    setMenuItems([]);
    setCategories([]);
    setOrders([]);
    setFormState(emptyForm);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormState(emptyForm);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      setError("Please log in again.");
      return;
    }

    if (!formState.name || !formState.description || !formState.price) {
      setError("Name, description, and price are required.");
      return;
    }

    const payload = {
      name: formState.name,
      description: formState.description,
      price: Number(formState.price),
      image: formState.image,
      category: formState.category || categories[0]?._id || "",
      ingredients: formState.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      available: formState.available,
      featured: formState.featured,
    };

    try {
      setSaving(true);
      setError("");

      if (isEditing && editingId) {
        await api.updateMenuItem(editingId, payload, token);
        setSuccess("Menu item updated successfully.");
      } else {
        await api.createMenuItem(payload, token);
        setSuccess("Menu item created successfully.");
      }

      await loadDashboard();
      resetForm();
    } catch (err) {
      setError(err.message || "Unable to save menu item");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditingId(item._id);
    setFormState({
      name: item.name || "",
      description: item.description || "",
      price: item.price ?? "",
      image: item.image || "",
      category:
        typeof item.category === "string"
          ? item.category
          : item.category?._id || "",
      ingredients: Array.isArray(item.ingredients)
        ? item.ingredients.join(", ")
        : "",
      available: item.available !== false,
      featured: !!item.featured,
    });
  };

  const handleDelete = async (id) => {
    if (!token || !window.confirm("Delete this menu item?")) {
      return;
    }

    try {
      setError("");
      await api.deleteMenuItem(id, token);
      setSuccess("Menu item deleted.");
      await loadDashboard();
      if (editingId === id) resetForm();
    } catch (err) {
      setError(err.message || "Unable to delete menu item");
    }
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0,
  );
  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#b61f26] text-2xl font-black text-white">
              O
            </div>
            <h1 className="text-3xl font-black text-slate-900">
              Odessye Admin
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to manage menu and orders
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(event) =>
                  setLoginForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none ring-0 transition focus:border-[#b61f26]"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#b61f26]"
                required
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            {success && (
              <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600">
                {success}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-[#b61f26] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#8f1a20]"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-[#fff7ed] p-3 text-sm text-[#7c4a00]">
            Demo admin: admin@odessye.com / admin123
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="flex min-h-screen">
        <aside className="w-72 bg-[#1e1d1d] p-6 text-white">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b61f26] text-xl font-black">
              O
            </div>
            <div>
              <h2 className="text-2xl font-black">Odessye</h2>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300">
                Admin
              </p>
            </div>
          </div>

          <nav className="space-y-2 text-sm font-medium">
            <Link
              to="/"
              className="flex w-full items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-slate-200 hover:bg-white/10"
            >
              Home
              <span>›</span>
            </Link>
            <button className="flex w-full items-center justify-between rounded-xl bg-[#b61f26] px-4 py-3 text-left text-white">
              Dashboard
              <span>›</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-left text-slate-200 hover:bg-white/10"
            >
              Logout
              <span>›</span>
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-6 lg:p-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                Overview
              </p>
              <h1 className="mt-2 text-4xl font-black text-slate-900">
                Dashboard
              </h1>
            </div>
            <div className="text-sm text-slate-600">
              {user ? `Logged in as ${user.name}` : "Loading user..."}
            </div>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Total Orders</p>
              <h3 className="mt-3 text-3xl font-black text-slate-900">
                {orders.length}
              </h3>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Revenue</p>
              <h3 className="mt-3 text-3xl font-black text-slate-900">
                ${totalRevenue.toFixed(2)}
              </h3>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Pending</p>
              <h3 className="mt-3 text-3xl font-black text-slate-900">
                {pendingOrders}
              </h3>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Menu Items</p>
              <h3 className="mt-3 text-3xl font-black text-slate-900">
                {menuItems.length}
              </h3>
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">
                  Menu Management
                </h2>
                <button
                  onClick={resetForm}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-400"
                >
                  {isEditing ? "Cancel edit" : "New item"}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                      Name
                    </label>
                    <input
                      name="name"
                      value={formState.name}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-[#b61f26]"
                      placeholder="Grilled Chicken"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                      Price
                    </label>
                    <input
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formState.price}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-[#b61f26]"
                      placeholder="19.99"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formState.description}
                    onChange={handleFormChange}
                    rows="3"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-[#b61f26]"
                    placeholder="Freshly grilled chicken with our signature sauce"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formState.category}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-[#b61f26]"
                    >
                      {categories.length === 0 ? (
                        <option value="">No categories</option>
                      ) : (
                        categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                      Image URL
                    </label>
                    <input
                      name="image"
                      value={formState.image}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-[#b61f26]"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Ingredients
                  </label>
                  <input
                    name="ingredients"
                    value={formState.ingredients}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-[#b61f26]"
                    placeholder="Chicken, rice, herbs"
                  />
                </div>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      name="available"
                      checked={formState.available}
                      onChange={handleFormChange}
                    />
                    Available
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formState.featured}
                      onChange={handleFormChange}
                    />
                    Featured
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#b61f26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f1a20] disabled:opacity-70"
                >
                  {saving
                    ? "Saving..."
                    : isEditing
                      ? "Update item"
                      : "Create item"}
                </button>
              </form>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">
                  Recent Orders
                </h2>
              </div>

              <div className="space-y-4">
                {orders.length === 0 ? (
                  <p className="text-sm text-slate-500">No orders yet.</p>
                ) : (
                  orders.slice(0, 4).map((order) => (
                    <div
                      key={order._id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-black text-slate-900">
                            {order.customerInfo?.name || "Walk-in customer"}
                          </p>
                          <p className="text-sm text-slate-500">
                            #{order._id.slice(-4)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-slate-900">
                            ${Number(order.total || 0).toFixed(2)}
                          </p>
                          <span className="inline-flex rounded-full bg-[#fef3c7] px-2.5 py-1 text-xs font-bold text-[#7c4a00]">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900">Menu Items</h2>
              <span className="text-sm text-slate-500">
                {menuItems.length} items
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-slate-600">
                  <tr className="border-b border-slate-200">
                    <th className="pb-3 pr-4 font-semibold">Name</th>
                    <th className="pb-3 pr-4 font-semibold">Category</th>
                    <th className="pb-3 pr-4 font-semibold">Price</th>
                    <th className="pb-3 pr-4 font-semibold">Status</th>
                    <th className="pb-3 pr-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-slate-100 align-middle"
                    >
                      <td className="py-3 pr-4 font-semibold text-slate-900">
                        {item.name}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">
                        {typeof item.category === "string"
                          ? item.category
                          : item.category?.name || "Uncategorized"}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">
                        ${Number(item.price || 0).toFixed(2)}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${item.available === false ? "bg-slate-200 text-slate-700" : "bg-green-100 text-green-700"}`}
                        >
                          {item.available === false
                            ? "Unavailable"
                            : "Available"}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            to={`/product/${item._id}`}
                            className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-400"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleEdit(item)}
                            className="rounded-full bg-[#fef3c7] px-3 py-1.5 text-xs font-semibold text-[#7c4a00]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
