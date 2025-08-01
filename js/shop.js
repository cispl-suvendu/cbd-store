import { fetchProducts } from "./api.js"
import { addToCart, isProductInWhishList, addToWishList } from "./utils.js"

export async function dispayShopProducts(filter, minPrice, maxPrice) {
    const products = await fetchProducts(filter, minPrice, maxPrice)

    const shopContainer = document.querySelector('.shop-prodcuts-list')

    if (shopContainer) {

        if (products.length > 0) {
            const shopProductsHTML = products.map((product, index) => {
                return (
                    `
            <div class="product-item">
                        <div class="product-image">
                            <img src="${product.thumbnail}" alt="${product.title}">
                        </div>
                        <div class="product-content">
                            <div class="prodcut-rating">
                                <span class="material-symbols-outlined">star_rate</span>
                                <span class="material-symbols-outlined">star_rate</span>
                                <span class="material-symbols-outlined">star_rate</span>
                                <span class="material-symbols-outlined">star_rate</span>
                                <span class="material-symbols-outlined">star_half</span>
                            </div>
                            <h3 class="product-title"><a href="/product.html?product-id=${product.id}">${product.title}</a></h3>
                            <div class="product-tag">Promotes Calm & Relaxation</div>
                            <div class="product-price">
                                <span class="old-price">$${product.oldPrice}</span>
                                <span class="new-price">$${product.price}</span>
                            </div>
                        </div>
                        <div class="product-action">
                            <a href="/product.html?product-id=${product.id}" class="button secondary">View Product</a>
                            <a href="javascript:void(0)" id="add-to-cart-${index}" class="button primary">Add to Cart</a>
                        </div>
                        <div class="product-wishlist">
                            <a href="javascript:void(0)" id="add-to-wishlist-${index}" class="${isProductInWhishList(product) && 'active'}">
                                <span class="material-symbols-outlined">favorite_border</span>
                            </a>
                        </div>
                    </div>
            `
                )
            }).join("")
            shopContainer.innerHTML = shopProductsHTML
        } else {
            shopContainer.innerHTML = 'No data found!'
        }

        // add to cart
        products.forEach((product, index) => {
            const addBtn = document.getElementById(`add-to-cart-${index}`);
            addBtn.addEventListener('click', () => {
                const selectedSize = product.sizes[0];
                addToCart(product, selectedSize);
            });
        });
        // add to wishlist
        products.forEach((product, index) => {
            const addBtn = document.getElementById(`add-to-wishlist-${index}`);
            addBtn.addEventListener('click', () => {
                addToWishList(product);
                addBtn.classList.toggle('active')
            });
        });
    }
}


dispayShopProducts()

document.body.addEventListener('input', function (e) {
    const isCategoryInput = e.target.closest('.custom-filter input[name="product-cat"]');
    const isMinOrMaxInput = e.target.closest('.min-input') || e.target.closest('.max-input') || e.target.closest('.min-range') || e.target.closest('.max-range');

    const checkboxes = document.getElementsByName('product-cat');
    const rangeMinPrice = document.querySelector('.min-range').value || 0;
    const rangeMaxPrice = document.querySelector('.max-range').value || 100;

    console.log('range', rangeMinPrice, rangeMaxPrice)

    const selectedValues = [];

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedValues.push(checkboxes[i].value);
        }
    }

    // If category changed or price inputs changed, update accordingly
    if (isCategoryInput || isMinOrMaxInput) {
        if (selectedValues.length > 0) {
            dispayShopProducts(selectedValues, rangeMinPrice, rangeMaxPrice);
        } else {
            dispayShopProducts(['all'], rangeMinPrice, rangeMaxPrice);
        }
    }
});


document.body.addEventListener('click', function (e) {
    if (e.target.closest('.filter-button')) {
        const filterDrawer = document.querySelector('.filter-list')
        if (filterDrawer) {
            filterDrawer.classList.toggle('active')
        }
    }

})