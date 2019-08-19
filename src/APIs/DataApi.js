const api = function(destination, options) {
  let url = "/"+destination;

  const ops = options || {};
  ops.credentials = "include";
  return fetch(url, ops);
};

export default api;
