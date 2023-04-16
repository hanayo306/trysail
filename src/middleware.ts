import { NextRequest, NextResponse } from "next/server";
import supabase from "./libs/supabase";

export async function middleware(request: NextRequest) {
  const firstPathname = request.nextUrl.pathname.split("/")[1];

  if (firstPathname === "auth") {
    const token = request.cookies.get("access_token")?.value;
    if (!token) return null;

    const {
      data: { user },
    } = await supabase.auth.getUser(token);
    if (!user) return null;

    return NextResponse.redirect(new URL("/", request.url));
  }

  if (firstPathname === "post") {
    const token = request.cookies.get("access_token")?.value;
    if (!token) return NextResponse.redirect(new URL("/auth/login", request.url));

    const {
      data: { user },
    } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.redirect(new URL("/auth/login", request.url));

    return null;
  }
}
