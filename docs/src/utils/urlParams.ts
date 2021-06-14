export function getUrlParam(param: string) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (!urlParams.has(param)) return;
  return urlParams.get(param);
}

export function getUrlWithSetParam(param: string, value?: string) {
  const url = new URL(window.location.toString());
  if (value === undefined || value.length === 0) {
    url.searchParams.delete(param);
  } else {
    url.searchParams.set(param, value);
  }
  return url.toString();
}
