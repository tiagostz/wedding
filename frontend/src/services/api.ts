import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL?.trim() || "";

export const api = axios.create({
  baseURL: API_URL || undefined,
  timeout: 10000,
});

export async function fetchWeddingBySlug(slug: string) {
  const { data } = await api.get(`/wedding/${slug}`);
  return data.data;
}
