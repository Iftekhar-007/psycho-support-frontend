import { NextRequest, NextResponse } from "next/server";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "https://psychology-support-backend.vercel.app";

async function handler(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const targetPath = url.pathname;
    const targetUrl = `${backendUrl}${targetPath}${url.search}`;

    const headers = new Headers(req.headers);
    // Remove host to allow target backend host
    headers.delete("host");
    headers.set("host", new URL(backendUrl).host);

    const body =
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.arrayBuffer()
        : undefined;

    const backendRes = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      cache: "no-store",
    });

    const responseHeaders = new Headers();

    // Copy backend response headers
    backendRes.headers.forEach((value, key) => {
      // Exclude content-encoding and transfer-encoding to prevent double compression issues
      if (
        key.toLowerCase() !== "content-encoding" &&
        key.toLowerCase() !== "transfer-encoding" &&
        key.toLowerCase() !== "content-length"
      ) {
        responseHeaders.set(key, value);
      }
    });

    // Handle Set-Cookie headers properly
    const setCookieHeaders =
      typeof backendRes.headers.getSetCookie === "function"
        ? backendRes.headers.getSetCookie()
        : [backendRes.headers.get("set-cookie")].filter(Boolean);

    const responseData = await backendRes.arrayBuffer();

    const response = new NextResponse(responseData, {
      status: backendRes.status,
      statusText: backendRes.statusText,
      headers: responseHeaders,
    });

    // Append each Set-Cookie header individually
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie) => {
        if (cookie) {
          response.headers.append("set-cookie", cookie);
        }
      });
    }

    return response;
  } catch (error) {
    console.error("Auth proxy error:", error);
    return NextResponse.json(
      { error: "Authentication service error", message: (error as Error).message },
      { status: 500 }
    );
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
  handler as OPTIONS,
};
