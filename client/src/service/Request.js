
import { authHeader } from "../helpers/authHeader";
var user = JSON.parse(localStorage.getItem("user")) || {};
console.log(user.token);
export default (uri, opts) => {
  opts.headers = authHeader();
  return fetch(uri, opts);
};