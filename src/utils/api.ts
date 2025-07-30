import { categories } from "../constants/categories";

export async function fetchCategoryItems(endpoint: string): Promise<Record<string, unknown>[]> {
  const res = await fetch(`https://valorant-api.com/v1${endpoint}`);
  const data = await res.json();
  return data.data || [];
}

export async function fetchSearchResults(term: string): Promise<Record<string, unknown>[]> {
  const endpoints = categories.map(c => c.endpoint);
  const allResults: Record<string, unknown>[] = [];
  await Promise.all(
    endpoints.map(async endpoint => {
      const res = await fetch(`https://valorant-api.com/v1${endpoint}`);
      const data = await res.json();
      if (Array.isArray(data.data)) {
        allResults.push(
          ...data.data
            .filter((item: unknown) => {
              if (typeof item !== "object" || item === null) return false;
              const obj = item as Record<string, unknown>;
              const name = typeof obj.displayName === "string"
                ? obj.displayName
                : typeof obj.title === "string"
                ? obj.title
                : typeof obj.name === "string"
                ? obj.name
                : undefined;
              return (
                name && typeof name === "string" && name.toLowerCase().includes(term.toLowerCase())
              );
            })
            .map((item: Record<string, unknown>) => ({ ...item, category: endpoint }))
        );
      }
    })
  );
  return allResults;
}
