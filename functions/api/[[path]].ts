interface PagesEnvironment {
  API_ORIGIN?: string;
}

interface PagesRequestContext {
  request: Request;
  env: PagesEnvironment;
}

export async function onRequest({ request, env }: PagesRequestContext): Promise<Response> {
  if (!env.API_ORIGIN) {
    return Response.json(
      { success: false, message: 'API origin is not configured.' },
      { status: 503 },
    );
  }

  let apiOrigin: URL;

  try {
    apiOrigin = new URL(env.API_ORIGIN);
  } catch {
    return Response.json(
      { success: false, message: 'API origin is invalid.' },
      { status: 503 },
    );
  }

  if (
    apiOrigin.protocol !== 'https:' ||
    apiOrigin.pathname !== '/' ||
    apiOrigin.username ||
    apiOrigin.password ||
    apiOrigin.search ||
    apiOrigin.hash
  ) {
    return Response.json(
      { success: false, message: 'API origin must be an HTTPS origin without a path.' },
      { status: 503 },
    );
  }

  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(`${incomingUrl.pathname}${incomingUrl.search}`, apiOrigin.origin);

  try {
    return await fetch(new Request(upstreamUrl, request));
  } catch {
    return Response.json(
      { success: false, message: 'The API is temporarily unavailable.' },
      { status: 502 },
    );
  }
}