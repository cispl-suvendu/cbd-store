import { displayCartCount, showHideCart, dispayWhishListModal, debouncedSearch } from "./utils.js";

async function includeHeaderFooter() {
    const elements = document.querySelectorAll('[data-include]');
    const includePromises = Array.from(elements).map(async (el) => {
        const file = el.getAttribute('data-include');
        const res = await fetch(file);
        const text = await res.text();
        el.innerHTML = text;
    });

    // Wait for all includes to finish
    await Promise.all(includePromises);

    // Now run the active link highlighter
    highlightActiveNav();
    showHideCart()
    displayCartCount()
    dispayWhishListModal()
    showHideMobileMenu()
}

function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".main-nav ul li a");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");

        if (currentPath.endsWith(linkPath)) {
            link.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", includeHeaderFooter);


// rangle slider
const rangevalue = document.querySelector(".slider .price-slider");
const rangeInputvalue = document.querySelectorAll(".range-input input");

// Set the price gap
let priceGap = 10;

// Adding event listeners to price input elements
const priceInputvalue = document.querySelectorAll(".price-input input");
for (let i = 0; i < priceInputvalue.length; i++) {
    priceInputvalue[i].addEventListener("input", e => {

        // Parse min and max values of the range input
        let minp = parseInt(priceInputvalue[0].value);
        let maxp = parseInt(priceInputvalue[1].value);
        let diff = maxp - minp

        if (minp < 0) {
            alert("minimum price cannot be less than 0");
            priceInputvalue[0].value = 0;
            minp = 0;
        }

        // Validate the input values
        if (maxp > 100) {
            alert("maximum price cannot be greater than 100");
            priceInputvalue[1].value = 100;
            maxp = 100;
        }

        if (minp > maxp - priceGap) {
            priceInputvalue[0].value = maxp - priceGap;
            minp = maxp - priceGap;

            if (minp < 0) {
                priceInputvalue[0].value = 0;
                minp = 0;
            }
        }

        // Check if the price gap is met and max price is within the range
        if (diff >= priceGap && maxp <= rangeInputvalue[1].max) {
            if (e.target.className === "min-input") {
                rangeInputvalue[0].value = minp;
                let value1 = rangeInputvalue[0].max;
                rangevalue.style.left = `${(minp / value1) * 100}%`;
            }
            else {
                rangeInputvalue[1].value = maxp;
                let value2 = rangeInputvalue[1].max;
                rangevalue.style.right = `${100 - (maxp / value2) * 100}%`;
            }
        }
    });

    // Add event listeners to range input elements
    for (let i = 0; i < rangeInputvalue.length; i++) {
        rangeInputvalue[i].addEventListener("input", e => {
            let minVal = parseInt(rangeInputvalue[0].value);
            let maxVal = parseInt(rangeInputvalue[1].value);

            let diff = maxVal - minVal

            // Check if the price gap is exceeded
            if (diff < priceGap) {

                // Check if the input is the min range input
                if (e.target.className === "min-range") {
                    rangeInputvalue[0].value = maxVal - priceGap;
                }
                else {
                    rangeInputvalue[1].value = minVal + priceGap;
                }
            }
            else {

                // Update price inputs and range progress
                priceInputvalue[0].value = minVal;
                priceInputvalue[1].value = maxVal;
                rangevalue.style.left = `${(minVal / rangeInputvalue[0].max) * 100}%`;
                rangevalue.style.right = `${100 - (maxVal / rangeInputvalue[1].max) * 100}%`;
            }
        });
    }
}

// mobile menu

function showHideMobileMenu () {
    document.body.addEventListener('click', function (e) {
        if(e.target.closest('#mb-menu-tigger')) {
            const mobileMenu = document.querySelector('.main-nav');
            const myElement = e.target.closest('#mb-menu-tigger')
            const menuIcon = myElement.querySelector('.material-symbols-outlined')
            if(mobileMenu) {
                mobileMenu.classList.toggle('active')
                document.body.classList.toggle('mb-menu-active');
                if (menuIcon.innerHTML === 'menu') {
                    menuIcon.innerHTML = 'close';
                } else {
                    menuIcon.innerHTML = 'menu';
                }
            }
        }
    })
}


// handleSearch

(function handleSearch () {
    document.body.addEventListener('click', function (e) {
        if(e.target.closest('#search-tigger')) {
            const searchDrawer = document.querySelector('.search-box');
            if(searchDrawer) {
                searchDrawer.classList.add('active')
                document.body.classList.add('drawer-active');
            }
        }

        if(e.target.closest('.icon-close-search')) {
            const searchDrawer = document.querySelector('.search-box');
            const inputSearch = document.querySelector('.search-input')
            const searchResultContainer = document.querySelector('#search-results')
            if(searchDrawer) {
                searchDrawer.classList.remove('active')
                document.body.classList.remove('drawer-active');
                inputSearch.value = ''
                searchResultContainer.innerHTML = ''
            }
        }
    })
    document.body.addEventListener('input', function(e) {
        const inputSearch = e.target.closest('.search-input')
        if(inputSearch) {
          debouncedSearch(inputSearch.value)
        }
    })
})()


