export function getParams(params = []) {
  const url = new URL(window.location.href);
  if (params.length) {
    const newParams = {};
    params.forEach((param) => {
      newParams[param] = url.searchParams.get(param);
    });
    return newParams;
  }

  const newParams = {};
  url.searchParams.forEach((value, key) => {
    newParams[key] = value;
  });
  return newParams;
}
