import { NextResponse } from "next/server";

export const runtime = "nodejs";

const backendUrl =
  process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;

async function forward(request, { params }) {
  if (!backendUrl) {
    return NextResponse.json(
      { success: false, message: "Backend API URL is not configured" },
      { status: 500 }
    );
  }

  const { path } = await params;
  const target = new URL(`/${path.join("/")}`, backendUrl);
  target.search = new URL(request.url).search;

  const headers = new Headers();
  const requestHeaders = ["authorization", "content-type", "cookie"];
  for (const name of requestHeaders) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  const init = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (!["GET", "HEAD"].includes(request.method)) {
    init.body = await request.arrayBuffer();
  }

  const response = await fetch(target, init);
  const responseHeaders = new Headers();
  const contentType = response.headers.get("content-type");
  if (contentType) responseHeaders.set("content-type", contentType);

  for (const cookie of response.headers.getSetCookie()) {
    responseHeaders.append(
      "set-cookie",
      cookie.replace(/Domain=[^;]+;?\s*/i, "")
    );
  }

  return new NextResponse(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export const GET = forward;
export const HEAD = forward;
export const POST = forward;
export const PUT = forward;
export const PATCH = forward;
export const DELETE = forward;
