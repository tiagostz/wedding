import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3333/api",
});

export async function fetchWeddingBySlug(slug: string) {
  const { data } = await api.get(`/wedding/${slug}`);
  return data.data;
}
