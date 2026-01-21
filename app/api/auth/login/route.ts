import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${API_BASE}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  const response = NextResponse.json({
    user: data.user,
  });

  const hour = 60 * 60;

  response.cookies.set("access_token", data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: hour * 2,
  });

  return response;
}
