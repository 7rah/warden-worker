const ICON_SERVICE_URL_PREFIX = "https://www.google.com/s2/favicons?domain=";
const ICON_SERVICE_URL_SUFFIX = "&sz=256";
const ICON_REDIRECT_CACHE_CONTROL = "public, max-age=604800";
const ICON_PATH_PATTERN = /^\/icons\/([^/]+)\/icon\.png$/;
const ICON_DOMAIN_PATTERN =
  /^(?=.{1,255}$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;

export function parseIconPath(pathname) {
  const match = ICON_PATH_PATTERN.exec(pathname);
  if (!match) {
    return null;
  }

  let domain;
  try {
    domain = decodeURIComponent(match[1]).trim().toLowerCase();
  } catch {
    return null;
  }

  if (!ICON_DOMAIN_PATTERN.test(domain)) {
    return null;
  }

  return { domain };
}

export function buildIconServiceUrl(domain) {
  return `${ICON_SERVICE_URL_PREFIX}${encodeURIComponent(domain)}${ICON_SERVICE_URL_SUFFIX}`;
}

export function buildIconRedirectResponse(domain) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: buildIconServiceUrl(domain),
      "Cache-Control": ICON_REDIRECT_CACHE_CONTROL,
    },
  });
}
