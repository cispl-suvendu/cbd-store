import { fetchProducts } from "./api.js"
import { addToCart, addToWishList, isProductInWhishList } from "./utils.js";

export async function displayProductDetails() {
    const products = await fetchProducts();
    const productId = new URLSearchParams(window.location.search).get('product-id');

    const product = products.find(p => p.id === productId);

    const isSingleProduct = document.querySelector('.single-product')

    if (isSingleProduct) {

        const singleProduct = document.querySelector('.single-product')
        const singleProductBigSlider = $('.single-product-big')

        // Optional: Destroy slick if it's already initialized
        if (singleProductBigSlider.hasClass('slick-initialized')) {
            singleProductBigSlider.slick('unslick');
        }

        // Clear previous content
        singleProductBigSlider.html('');

        const singleProductSmallSlider = $('.single-product-small')

        // Optional: Destroy slick if it's already initialized
        if (singleProductSmallSlider.hasClass('slick-initialized')) {
            singleProductSmallSlider.slick('unslick');
        }

        // Clear previous content
        singleProductSmallSlider.html('');

        const prodcutTitle = document.querySelector('.single-product-title')
        const prodcutPrice = document.querySelector('.single-product-price')
        const prodcutDescription = document.querySelector('.single-product-des')
        const productKeyBenefits = document.querySelector('.single-product-benefits ul')
        const productSize = document.querySelector('.size-list')
        const productAction = document.querySelector('.single-product-action')
        const prodcutUserManula = document.querySelector('.how-to-use-inner')
        const prodcutIngridients = document.querySelector('.product-ingridients-inr')
        const productFAQ = document.querySelector('.list-faq')

        // Clear previous content
        prodcutTitle.innerHTML = ''
        prodcutPrice.innerHTML = ''
        prodcutDescription.innerHTML = ''
        productKeyBenefits.innerHTML = ''
        productSize.innerHTML = ''
        productAction.innerHTML = ''
        prodcutUserManula.innerHTML = ''
        prodcutIngridients.innerHTML = ''
        productFAQ.innerHTML = ''

        if (product) {
            // single-product-big
            product.images.forEach(function (img) {
                const bigSliderContent = `<div class="item">
                <div class="product-img-big">
                    <img src="${img}" alt="${product.title}" />
                </div>
            </div>`
                singleProductBigSlider.append(bigSliderContent)
            })
            singleProductBigSlider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.single-product-small',
                dots: false
            });
            // single-product-small
            product.images.forEach(function (img) {
                const smallSliderContent = `<div class="item">
                <div class="product-img-small">
                    <img src="${img}" alt="${product.title}" />
                </div>
            </div>`
                singleProductSmallSlider.append(smallSliderContent)
            })
            singleProductSmallSlider.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.single-product-big',
                dots: false,
                centerMode: true,
                focusOnSelect: true,
                arrows: false,
            });
            // prodcutTitle
            prodcutTitle.innerHTML = product.title
            // prodcutPrice
            const price = `<span class="old-price">$${product.oldPrice}</span>
                    <span class="new-price">$${product.price}</span>
                    <div class="sale-badge">${product.discountPercentage}% off</div>`
            prodcutPrice.innerHTML = price
            // prodcutDescription
            product.description.forEach(function (des) {
                prodcutDescription.innerHTML += `<p>${des}</p>`
            })
            // keyBenefits
            product.benefits.forEach((benefit) => {
                productKeyBenefits.innerHTML += `<li>${benefit}</li>`
            })
            // size
            product.sizes.forEach((size, index) => {
                productSize.innerHTML += `
                <div class="custom-size-box">
                    <label>
                        <input type="radio" value="${size}" name="product-size" checked />
                        <span class="custom-radio"></span>
                        <span>${size}</span>
                    </label>
                </div>
            `
            })
            // Action
            productAction.innerHTML = `
            <div class="action">
                <button class="button wishlist ${isProductInWhishList(product) && 'active'}">
                    <span class="material-symbols-outlined">favorite</span>
                </button>
            </div>
            <div class="action">
                <button class="button addTocart">Add to cart</button>
            </div>`
            // prodcutUserManula
            prodcutUserManula.innerHTML += `
        <div class="heading-group">
            <h6>user manual</h6>
            <h2 class="common-heading">How to Use</h2>
        </div>
        <ul>
            ${product.userManual.map((item, index) => `
                <li>
                    <div class="number">${index + 1}</div>
                    <div class="text">${item}</div>
                </li>
            `).join("")}
        </ul>
        <div class="action-group">
            <button class="button addTocart">Shop now</button>
        </div>`;
            // Ingridients
            const leftIngridients = product.ingredients.slice(0, 3)
            const rightIngridients = product.ingredients.slice(3)
            const ingredientHtml = (item) => {
                return (
                    `<div class="ingridient-box">
                <img src="${item.image}" alt="${item.title}" />
                <h6>${item.title}</h6>
                <p>${item.description}</p>
            </div>`
                )
            }
            prodcutIngridients.innerHTML += `
        <div class="ingridients-list-left">
            ${leftIngridients.map((item) => ingredientHtml(item)).join("")}
        </div>
        <div class="ingridient-product">
            <img src="images/bg-ingredients.png" alt="bg-ingredients" class="ingredient-bg" />
            <img src="${product.thumbnail}" class="product-img" alt="${product.title}">
        </div>
        <div class="ingridients-list-right">
            ${rightIngridients.map((item) => ingredientHtml(item)).join("")}
        </div>
        `
            // FAQ
            const faqData = product.faq.map((faq, index) => {
                return (
                    `
                <div class="faq-item ${index == 0 && 'active'}">
                        <div class="faq-question">
                            <h4>${faq.question}</h4>
                            <span class="material-symbols-outlined">keyboard_arrow_down</span>
                        </div>
                        <div class="faq-answer">
                            <p>${faq.answer}</p>
                        </div>
                    </div>
                `
                )
            }).join("")
            productFAQ.innerHTML = faqData
        } else {
            singleProduct.innerHTML = `<div class="container">
            <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div class="text-center">
                    <p class="text-base font-semibold text-black">404</p>
                    <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Product not found</h1>
                    <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the product you’re looking for.</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                    <a href="shop.html" class="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">Go back shop</a>
                    </div>
                </div>
                </main>
        </div>`
        }
        // add to cart
        const shopButtons = document.querySelectorAll('.addTocart');
        shopButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedSizeInput = document.querySelector('input[name="product-size"]:checked');
                const selectedSize = selectedSizeInput ? selectedSizeInput.value : null;

                if (!selectedSize) {
                    alert('Please select a size before adding to cart.');
                    return;
                }

                addToCart(product, selectedSize); // Make sure `product` is in scope
            });
        });
        // wishlist
        const wishlistButton = document.querySelector('.wishlist');
        if (wishlistButton) {
            wishlistButton.addEventListener('click', () => {
                addToWishList(product);
                wishlistButton.classList.toggle('active')
            });
        }
    }
}

displayProductDetails()