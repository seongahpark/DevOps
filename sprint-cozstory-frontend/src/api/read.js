export function readAll() {
  return () => fetch('http://localhost:3000/article').then(resp => resp.json()).then(arr => arr.reverse())
}

export function readOne(id) {
  return () => fetch(`http://localhost:3000/article/${id}`).then(resp => resp.json())
}