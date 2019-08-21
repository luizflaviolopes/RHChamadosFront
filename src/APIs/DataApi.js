const api = function (destination, options) {
  let url = "http://localhost:5000/" + destination;

  const ops = options || {};
  ops.credentials = "include";
  return fetch(url, ops);
};

export default api;
