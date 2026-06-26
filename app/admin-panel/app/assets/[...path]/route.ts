import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "https://bc-game-backend-production.up.railway.net";

async function handleRequest(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join("/");
  const url = `${BACKEND_URL}/assets/${path}${request.nextUrl.search}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': request.headers.get('accept') || '*/*',
      },
      credentials: "omit",
    });

    const data = await response.arrayBuffer();

    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      if (!['content-encoding', 'transfer-encoding', 'connection', 'content-length'].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: unknown) {
    console.error(`Asset proxy error for ${url}:`, error);
    return new NextResponse("Not Found", { status: 404 });
  }
}

export const GET = handleRequest;
