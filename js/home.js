import { fetchProducts } from "./api.js"
import { addToCart, addToWishList, isProductInWhishList } from './utils.js'

export async function displayHomeProducts() {
    const products = await fetchProducts();

    const isHomePage = document.querySelector('.index-product-list')

    if (isHomePage) {
        const container = $('.index-product-slider');

        // Optional: Destroy slick if it's already initialized
        if (container.hasClass('slick-initialized')) {
            container.slick('unslick');
        }

        // Clear previous content
        container.html('');

        // Generate new slides
        products.forEach(function (product, index) {
            const productHTML = `
            <div class="item">
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
            </div>
        `;
            container.append(productHTML);
        });

        // Re-initialize Slick
        container.slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            nextArrow: '<div class="nextArrow"><span class="material-symbols-outlined">arrow_right_alt</span></div>',
            prevArrow: '<div class="prevArrow"><span class="material-symbols-outlined">arrow_left_alt</span></div>',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                }
            ]
        });

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

displayHomeProducts()