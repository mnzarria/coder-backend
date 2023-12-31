const socket = io();

socket.on('message0', (data) => {
  console.log(data);
});

socket.on("message1", (data) => {
  console.log(data);
});

socket.on("message2", (data) => {
  console.log(data);
});

socket.on("message3", (data) => {
  console.log(data);
});

socket.on("message4", (data) => {
  console.log(data);
});

const form = document.querySelector("#create-product-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#product-title").value;
  const price = document.querySelector("#product-price").value;
  const description = document.querySelector("#product-description").value;
  const code = document.querySelector("#product-code").value;
  const stock = document.querySelector("#product-stock").value;
  const category = document.querySelector("#product-category").value;
  const status = true; 
  socket.emit("createProduct", (product = { title: name, price, description, code, stock, category, status }));
  form.reset();
});

socket.on("product-list", (products) => {
  const productTable = document.querySelector("#product-table tbody");
  productTable.innerHTML = "";
  products.forEach((product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${product.title}</td><td>$${product.price}</td><td>${product.stock}u</td><td><button class="delete-product" data-id="${product.id}">Borrar</button></td>`;
    productTable.appendChild(tr);
  });
});

const productTable = document.querySelector("#product-table tbody");
productTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-product")) {
    const id = event.target.dataset.id;
    socket.emit("deleteProduct", parseInt(id));
  }
});
