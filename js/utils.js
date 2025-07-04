import { fetchProducts } from "./api.js";
import { dispayShopProducts } from "./shop.js";
import { displayHomeProducts } from "./home.js";
import { displayProductDetails } from "./productDeatils.js";


export const addToCart = (product, size) => {
    try {
        // Get cart from localStorage or set empty array
        const storedCart = localStorage.getItem('cart-Items');
        const cartItems = storedCart ? JSON.parse(storedCart) : [];

        // Find if the product already exists with the same ID and size
        const existingIndex = cartItems.findIndex(p => p.id === product.id && p.selectedSize === size);

        if (existingIndex === -1) {
            // Product with this size doesn't exist → add as new
            const productToAdd = {
                ...product,
                selectedSize: size,
                quantity: 1
            };
            cartItems.push(productToAdd);
            displayAlert('Product added to cart')
        } else {
            // Product with same ID and size already exists → increase quantity
            cartItems[existingIndex].quantity += 1;
            displayAlert('Product added to cart')
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart-Items', JSON.stringify(cartItems));
        displayCartProducts()
        displayCartCount()
        showHideCart()


    } catch (error) {
        displayAlert(`Failed to add to cart: ${error}`)
    }
}

export async function displayCartCount() {
    const cartDispaly = document.querySelector('.cart-count')
    const storeCount = localStorage.getItem('cart-Items')
    const cartCount = storeCount ? JSON.parse(storeCount) : []
    cartDispaly.innerHTML = cartCount.length
}


export function displayAlert(message, type = "s") {
    // Remove existing alert if any
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert HTML
    const alertHTML = `
        <div class="alert ${type === "e" ? 'error' : 'success'}">
            <div class="alert-inr">
                <span class="material-symbols-outlined">
                    ${type === "e" ? 'close_small' : 'check_small'}
                </span>
                <div>${message}</div>
            </div>
        </div>
    `;

    // Insert alert into DOM
    document.body.insertAdjacentHTML('beforeend', alertHTML);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert');
        if (alert) alert.remove();
    }, 3000);
}


export function displayCartProducts() {
    const storedCart = localStorage.getItem('cart-Items');
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    const existingCartDrawer = document.querySelector('.cart-drawer');

    if (existingCartDrawer) {
        existingCartDrawer.remove();
    }

    if (cartItems.length > 0) {
        const cartTotal = cartItems.reduce((a, b) => a + (b.price * b.quantity ?? 1), 0)
        const cartHtml = `
        <section class="cart-drawer">
            <div class="cart-drawer-inr">
                <div class="cart-drawer-hdr">
                    <h4>Your cart</h4>
                    <div class="cart-drawer-close"><span class="material-symbols-outlined">close</span></div>
                </div>
                <div class="cart-drawer-content">
                    <div class="cart-drawer-content-hdr">
                        <div>Product</div>
                        <div>Total</div>
                    </div>
                    <div class="cart-drawer-content-bdy">
                        ${cartItems.map((item, index) => {
            return (
                `
                                <div class="cart-product">
                                    <div class="product-img">
                                        <a href=""><img src="${item.thumbnail}" alt="${item.title}" /></a>
                                    </div>
                                    <div class="product-title">
                                        <h3><a href="/product.html?product-id=${item.id}">${item.title}</a></h3>
                                        <h6>${item.selectedSize ? item.selectedSize : item.sizes[0]}</h6>
                                        <div class="remove-product" id="remove-product-${index}"><div class="remove-icon"><span class="material-symbols-outlined">close</span></div> remove</div>
                                    </div>
                                    <div class="product-qty">
                                        <input type="tel" value="${item.quantity}" name="product-qty" readonly />
                                    </div>
                                    <div class="product-price">
                                       ${item.price}
                                    </div>
                                </div>
                                `
            )
        }).join("")}
                    </div>
                    <div class="cart-drawer-content-ftr">
                        <div>Estimated total</div>
                        <div>$${cartTotal}</div>
                    </div>
                </div>
                <div class="cart-drawer-ftr">
                    <button class="button">complete checkout</button>
                </div>
            </div>
        </section>
        `
        document.body.insertAdjacentHTML('beforeend', cartHtml);
    } else {
        const noCartHtml = `
        <section class="cart-drawer">
            <div class="cart-drawer-inr">
                <div class="cart-drawer-hdr">
                    <h4>Your cart</h4>
                    <div class="cart-drawer-close"><span class="material-symbols-outlined">close</span></div>
                </div>
                <div class="cart-drawer-content mt-6">
                    <p class="font-semibold text-base mb-6">Your cart is empty!</p>
                    <div class="button-group">
                        <a class="button" href="shop.html">Shop Now</a>
                    </div>
                </div>
            </div>
         </section>       
        `
        document.body.insertAdjacentHTML('beforeend', noCartHtml);
    }
    // Remove cart
    cartItems.forEach((product, index) => {
        const removeBtn = document.getElementById(`remove-product-${index}`);
        removeBtn.addEventListener('click', () => {
            removeCartItem(index);
        });
    });
}

displayCartProducts()


// showHideCart

export function showHideCart() {
    document.body.addEventListener('click', function (e) {
        if (e.target.closest('#cart-tigger')) {
            const drawer = document.querySelector('.cart-drawer');
            if (drawer) {
                drawer.classList.add('active');
                document.body.classList.add('drawer-active');
            }
        }

        if (e.target.closest('.cart-drawer-close')) {
            const drawer = document.querySelector('.cart-drawer');
            if (drawer) {
                drawer.classList.remove('active');
                document.body.classList.remove('drawer-active');
            }
        }
    });
}

// remove cart

export function removeCartItem(item) {
    const storedCart = localStorage.getItem('cart-Items');
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    const remainingCartItem = cartItems.filter((_product, i) => i !== item)
    localStorage.setItem('cart-Items', JSON.stringify(remainingCartItem));
    displayCartProducts()
    const drawer = document.querySelector('.cart-drawer');
    if (drawer) {
        drawer.classList.add('active');
        document.body.classList.add('drawer-active');
    }
    showHideCart()
    displayCartCount()
}

// wishlist

export function addToWishList(item) {
    try {
        const storedWishList = localStorage.getItem('wishlist')
        let wishList = storedWishList ? JSON.parse(storedWishList) : []

        const existingWishList = wishList.find(wish => wish.id === item.id)

        if (existingWishList) {
            const restWishList = wishList.filter(wish => wish.id !== item.id)
            wishList = restWishList
            displayAlert('Product removed from wishlist', 'e')
        } else {
            wishList.push(item)
            displayAlert('Product added to wishlist')
        }
        localStorage.setItem('wishlist', JSON.stringify(wishList))

    } catch (error) {
        displayAlert(error, 'e')
    }
    dispayWhishListModal()
}

// Product In WhishList

export function isProductInWhishList(item) {
    const storedWishList = localStorage.getItem('wishlist')
    let wishList = storedWishList ? JSON.parse(storedWishList) : []
    const existingWishList = wishList.find(wish => wish.id === item.id)
    return !!existingWishList
}

export function dispayWhishListModal() {
    const storedWishList = localStorage.getItem('wishlist')
    let wishList = storedWishList ? JSON.parse(storedWishList) : []
    const wishListModal = document.querySelector('.popup-wishlist')

    if (wishListModal) {
        wishListModal.remove()
    }

    if (wishList.length > 0) {
        const wishlistHTML = `
                <section class="popup-wishlist">
                    <div class="popup-wishlist-hdr">
                        <h2 class="common-heading">Your Wishlist</h2>
                        <div class="popup-wishlist-close"><span class="material-symbols-outlined">close</span></div>
                    </div>
                    <div class="popup-wishlist-list">
                        <ul>
                        ${wishList.map((product, index) => {
                        return (
                            `
                            <li>
                                <div class="product-img">
                                    <a href="/product.html?product-id=${product.id}"><img src="${product.thumbnail}" alt="${product.title}" /></a>
                                </div>
                                <div class="product-meta">
                                    <h3 class="product-title"><a href="/product.html?product-id=${product.id}">${product.title}</a></h3>
                                    <div class="product-tag">Promotes Calm & Relaxation</div>
                                    <div class="product-price">
                                        <span class="old-price">$${product.oldPrice}</span>
                                        <span class="new-price">$${product.price}</span>
                                    </div>
                                    <div class="remove-product rmvWish" id="remove-wish-${index}"><div class="remove-icon"><span class="material-symbols-outlined">close</span></div> remove</div>
                                </div>
                            </li>
                            `)
                    }).join("")}
                        </ul>
                    </div>
                </section>
                `
        document.body.insertAdjacentHTML('beforeend', wishlistHTML);
    } else {
        const wishlistHTML = `
                <section class="popup-wishlist">
                    <div class="popup-wishlist-hdr">
                        <h2 class="common-heading">Your Wishlist</h2>
                        <div class="popup-wishlist-close"><span class="material-symbols-outlined">close</span></div>
                    </div>
                    <div class="no-wishlist flex flex-col items-center justify-center pt-40">
                        <p class="font-semibold text-base mb-6">Your wishlist is empty!</p>
                        <div class="button-group inline-block">
                            <a class="button" href="shop.html">Back To Shop</a>
                        </div>
                    </div>
                </section>
                `
        document.body.insertAdjacentHTML('beforeend', wishlistHTML);
    }

    

    document.body.addEventListener('click', function (e) {
        if (e.target.closest('#wish-tigger')) {
            const wishDrawer = document.querySelector('.popup-wishlist');
            if (wishDrawer) {
                wishDrawer.classList.add('active');
                document.body.classList.add('drawer-active');
            }
        }
        if (e.target.closest('.popup-wishlist-close')) {
            const wishDrawer = document.querySelector('.popup-wishlist');
            if (wishDrawer) {
                wishDrawer.classList.remove('active');
                document.body.classList.remove('drawer-active');
                displayHomeProducts()
                dispayShopProducts()
                displayProductDetails()
            }
        }
    });

    const wishlistSection = document.querySelector('.popup-wishlist');
    wishlistSection.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-product');
        if (removeBtn) {
            const index = removeBtn.id.replace('remove-wish-', '');
            const product = wishList[index];

            if (product) {
                addToWishList(product);
                dispayWhishListModal();
                const updatedWishDrawer = document.querySelector('.popup-wishlist');
                updatedWishDrawer.classList.add('active');
                document.body.classList.add('drawer-active');
            }
        }
    });
}

async function search (keyWord) {
    const allProducts = await fetchProducts()
    const searchResultContainer = document.querySelector('#search-results')
    searchResultContainer.innerHTML = ''
    const searchResults = allProducts.filter((product) => product.title.toLowerCase().includes(keyWord.toLowerCase()))
    console.log("searchResults", searchResults) 
    if(searchResults.length > 0 && searchResultContainer) {
        const searchResultHtml = searchResults.map((product) => {
            return (
                `
                <li>
                    <div class="sr-wrap">
                        <div class="product-img">
                            <a href="/product.html?product-id=${product.id}"><img src="${product.thumbnail}" alt="${product.title}" /></a>
                        </div>
                        <div class="product-meta">
                            <h3 class="product-title"><a href="/product.html?product-id=${product.id}">${product.title}</a></h3>
                            <div class="product-tag">Promotes Calm & Relaxation</div>
                            <div class="product-price">
                                <span class="old-price">$${product.oldPrice}</span>
                                <span class="new-price">$${product.price}</span>
                            </div>
                        </div>
                    </div>
                </li>
                `
            )
        }).join("")
        searchResultContainer.innerHTML = searchResultHtml
    } else {
        searchResultContainer.innerHTML = `
            <li>
                <div class="no-result">No data found!</div>
            </li>
        `
    }
}

export function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export const debouncedSearch = debounce(search, 800);


