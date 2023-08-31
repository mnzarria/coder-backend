const socketClient = io();

const addProductButton = document.getElementById('addProductButton');

const prodTitle = document.getElementById("product-title");
const prodPrice = document.getElementById("product-price");
const prodDescription = document.getElementById("product-description");
const prodCode = document.getElementById("product-code");
const prodStock = document.getElementById("product-stock");
const prodCategory = document.getElementById("product-category");
const prodStatus = true;

addProductButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newProduct = {
    title: prodTitle.value,
    description: prodDescription.value,
    price: prodPrice.value,
    thumbnails:"",
    code: prodCode.value,
    stock: prodStock.value,
    category: prodCategory.value,
    status: prodStatus,
  }
  socketClient.emit('addNewProduct', newProduct);
  console.log('Producto agregado');
  document.location.reload();
});

socketClient.on("product-list", (products) => {
  const productTable = document.getElementById("product-table tbody");
  productTable.innerHTML = "";
  products.forEach((product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${product.title}</td><td>$${product.price}</td><td>${product.stock}u</td><td><button class="delete-product" data-id="${product.id}">Borrar</button></td>`;
    productTable.appendChild(tr);
  });
});

const deleteProduct = document.getElementById('productsTable');
deleteProduct.addEventListener('click', (e) => {
  e.preventDefault();
  const element = e.target;
  const productId = element.getAttribute('data-id');
  if (element.className === 'delete') {
    socketClient.emit('deleteProduct', productId);
    document.location.reload();
  }
});
