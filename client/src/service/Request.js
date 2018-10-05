
var token = localStorage.getItem("token") || "";
export default (uri, opts) => {
  opts.headers= { 
    'Content-Type': 'application/json',
    'x-access-token': `Bearer ${token}`
   }
  return fetch(uri, opts)
}