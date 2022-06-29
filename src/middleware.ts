import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return;
  }

  const slug = req.nextUrl.pathname.split("/").pop();

  const data = await (await fetch(`${req.nextUrl.origin}/api/${slug}`)).json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
};
