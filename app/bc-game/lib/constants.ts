export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api";

export function getMediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  
  // Remove "/api" from BASE_URL to get the root backend URL for /uploads
  const backendRoot = BASE_URL.replace(/\/api$/, "");
  
  // Ensure the path is properly joined with the backend root
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${backendRoot}${cleanPath}`;
}
