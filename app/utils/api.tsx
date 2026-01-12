const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  token?: string;
};

export async function api(
  endpoint: string,
  { method = "GET", body, token }: ApiOptions = {}
) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // 🔎 safer error parsing
  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw { status: res.status, data };
  }

  return data;
}
