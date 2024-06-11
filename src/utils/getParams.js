export function getParams(searchParams, params = []) {
  if (params.length) {
    const newParams = {};
    params.forEach((param) => {
      newParams[param] = searchParams.get(param);
    });
    return newParams;
  }

  const newParams = {};
  searchParams.forEach((value, key) => {
    newParams[key] = value;
  });
  return newParams;
}
