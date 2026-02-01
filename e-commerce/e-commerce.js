const categoryFilter = document.getElementById("categoryFilter");
const sortOption = document.getElementById("sortOption");
const productContainer = document.querySelector(".product");
const products = Array.from(document.querySelectorAll(".category"));

/* FILTER BY CATEGORY */
categoryFilter.addEventListener("change", () => {
  const selectedCategory = categoryFilter.value;

  products.forEach(product => {
    const categoryText = product.querySelector("span").innerText;

    if (selectedCategory === "All" || categoryText === selectedCategory) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});

/* SORT PRODUCTS */
sortOption.addEventListener("change", () => {
  let sortedProducts = [...products];

  if (sortOption.value === "priceAsc") {
    sortedProducts.sort((a, b) => getPrice(a) - getPrice(b));
  }

  if (sortOption.value === "priceDesc") {
    sortedProducts.sort((a, b) => getPrice(b) - getPrice(a));
  }

  if (sortOption.value === "nameAsc") {
    sortedProducts.sort((a, b) =>
      getName(a).localeCompare(getName(b))
    );
  }

  if (sortOption.value === "nameDesc") {
    sortedProducts.sort((a, b) =>
      getName(b).localeCompare(getName(a))
    );
  }

  if (sortOption.value === "ratingAsc") {
    sortedProducts.sort((a, b) => getRating(a) - getRating(b));
  }

  if (sortOption.value === "ratingDesc") {
    sortedProducts.sort((a, b) => getRating(b) - getRating(a));
  }

  // Re-append sorted products
  productContainer.innerHTML = "";
  sortedProducts.forEach(p => productContainer.appendChild(p));
});

/* HELPER FUNCTIONS */
function getPrice(product) {
  return Number(
    product.innerText.match(/₹?\s?(\d+)/)[1]
  );
}

function getName(product) {
  return product.querySelector("h3").innerText;
}

function getRating(product) {
  return Number(product.querySelector(".rating-text").innerText);
}
