export function deleteOne(id) {
  return fetch(`http://localhost:3000/article/${id}`, {
    method: 'DELETE',
    mode: 'cors'
  }).then(resp => resp.json())
}