fetch('http://localhost:3333/')
.then(resp => resp.text())
.then(text => {
  console.log(text)
  document.getElementById("message-from-server").textContent = text
})