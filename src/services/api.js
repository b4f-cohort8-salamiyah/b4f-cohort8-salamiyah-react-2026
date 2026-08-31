const API_BASE = "/api";

const getAuthHeaders = (token, customHeaders = {}) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  ...customHeaders,
});

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: getAuthHeaders(options.token, options.headers),
    ...options,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const api = {
  getMenu: () => request("/menu"),
  getMenuById: (id) => request(`/menu/${id}`),
  getCategories: () => request("/categories"),
  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getCurrentUser: (token) =>
    request("/auth/me", {
      token,
    }),
  getOrders: (token) =>
    request("/orders", {
      token,
    }),
  createMenuItem: (payload, token) =>
    request("/menu", {
      method: "POST",
      token,
      body: JSON.stringify(payload),
    }),
  updateMenuItem: (id, payload, token) =>
    request(`/menu/${id}`, {
      method: "PATCH",
      token,
      body: JSON.stringify(payload),
    }),
  deleteMenuItem: (id, token) =>
    request(`/menu/${id}`, {
      method: "DELETE",
      token,
    }),
  createOrder: (payload) =>
    request("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
