const api = function(url, options) {
  const ops = options || {};
  ops.credentials = "include";
  return fetch(url, ops);
};

export default api;
