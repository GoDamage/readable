export function fetchPosts() {
  return fetch("http://localhost:3001/posts", {
    headers: { Authorization: "qwertyuiop" }
  })
    .then(res => res.json())
    .then(data => data.map(post => post))
    .catch(error => console.log("Request failed", error));
}
