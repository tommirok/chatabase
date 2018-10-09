export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user")) || {};

  return {
    "Content-Type": "application/json",
    "x-access-token": user.token
  };
}