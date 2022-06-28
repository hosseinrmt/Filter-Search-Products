// const { default: axios } = require("axios");

const searchInput = document.querySelector("#search");
const DOMProducts = document.querySelector(".products");
const BTNs = document.querySelectorAll(".btn");
let allProductsData = [];
const filters = {
  searchItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((respond) => {
      allProductsData = respond.data;
      renderProducts(respond.data, filters);
    })
    .catch((error) => console.log(error));
});

searchInput.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.includes(_filters.searchItems);
  });
  DOMProducts.innerHTML = "";
  console.log(filteredProducts);

  filteredProducts.forEach((item, index) => {
    const producsDiv = document.createElement("div");
    producsDiv.innerHTML = `
    <div class="product bg-indigo-100 m-4 p-2 w-[28rem] md:w-[21rem] rounded-xl mx-auto flex md:flex-col">
    <div class="img-container">
        <img class="aspect-square w-48 max-w-[28rem] md:w-[20rem] rounded-xl" src=${item.image}
            alt="p-${index}" />
    </div>
    <div class="product-desc p-4">
        <p class="product-title text-2xl m-1">${item.title}</p>
        <p class="product-price text-3xl">${item.price} $</p>
    </div>
    </div>`;
    DOMProducts.appendChild(producsDiv);
  });
}

BTNs.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    console.log(filter);
    filters.searchItems = filter;
    renderProducts(allProductsData, filters )
  });
});
