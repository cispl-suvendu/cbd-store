import { fetchProducts } from "./api.js";

(async function displayFAQ() {
    const allProducts = await fetchProducts()

    const faqTabs = `
     <ul>
            <li><a href="javascript:void(0)" class="active tablinks" data-id="allFaq">general faq</a></li>
            <li><a href="javascript:void(0)" class="tablinks" data-id="SN-01">CBD Shampoo FAQ</a></li>
            <li><a href="javascript:void(0)" class="tablinks" data-id="SN-02">CBD Hemp Oil FAQ</a></li>
            <li><a href="javascript:void(0)" class="tablinks" data-id="SN-03">CBD Hemp Liver Oil FAQ</a></li>
            <li><a href="javascript:void(0)" class="tablinks" data-id="SN-04">CBD Hemp Capsule FAQ</a></li>
            <li><a href="javascript:void(0)" class="tablinks" data-id="SN-05">CBD Flowers FAQ</a></li>
            <li><a href="javascript:void(0)" class="tablinks" data-id="SN-06">CBD Cream FAQ</a></li>
        </ul>
    `

    const faqContentList = `
            <div class="faq-content-list" id="allFAQ">
                <h4 class="faq-content-title">general faq</h4>
                <div class="list-faq">
                    <div class="faq-item active">
                        <div class="faq-question">
                            <h4>What is CBD?</h4>
                            <span class="material-symbols-outlined">keyboard_arrow_down</span>
                        </div>
                        <div class="faq-answer">
                            <p>CBD (Cannabidiol) is a naturally occurring compound found in the hemp plant. Unlike THC, it does not produce a high, but it may help with stress, pain, sleep, and inflammation.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">
                            <h4>Is CBD legal?</h4>
                            <span class="material-symbols-outlined">keyboard_arrow_down</span>
                        </div>
                        <div class="faq-answer">
                            <p>Yes, CBD products derived from hemp containing less than 0.3% THC are federally legal in many countries, including the U.S. However, laws may vary by region, so please check local regulations.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">
                            <h4>Will CBD make me high?</h4>
                            <span class="material-symbols-outlined">keyboard_arrow_down</span>
                        </div>
                        <div class="faq-answer">
                            <p>No. CBD is non-psychoactive, meaning it won’t get you high. Our products are made with broad-spectrum or isolate CBD, ensuring zero or trace THC (within legal limits).</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">
                            <h4>How long does it take to feel the effects?</h4>
                            <span class="material-symbols-outlined">keyboard_arrow_down</span>
                        </div>
                        <div class="faq-answer">
                            <p>It depends on the person and the method of use. Oil/tincture: 15–45 minutes, Gummies/capsules: 30–90 minutes, Topicals: Within minutes on targeted areas</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">
                            <h4>Are your products lab tested?</h4>
                            <span class="material-symbols-outlined">keyboard_arrow_down</span>
                        </div>
                        <div class="faq-answer">
                            <p>Yes! All our products are third-party lab tested for potency, purity, and safety. Every batch comes with a Certificate of Analysis (COA) available for your review.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">
                            <h4>Is CBD safe to use daily?</h4>
                            <span class="material-symbols-outlined">keyboard_arrow_down</span>
                        </div>
                        <div class="faq-answer">
                            <p>For most people, yes. CBD is generally well-tolerated and non-addictive. However, consult your healthcare provider if you’re pregnant, nursing, or on medication.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">
                            <h4>How should I store CBD products?</h4>
                            <span class="material-symbols-outlined">keyboard_arrow_down</span>
                        </div>
                        <div class="faq-answer">
                            <p>Store in a cool, dry place, away from direct sunlight and heat. Keep tightly sealed to maintain potency and shelf life.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="faq-content-list" id="SN-01">
                <h4 class="faq-content-title">CBD Shampoo FAQ</h4>
                <div class="list-faq"></div>
            </div>
            <div class="faq-content-list" id="SN-02">
                <h4 class="faq-content-title">CBD Shampoo FAQ</h4>
                <div class="list-faq"></div>
            </div>
            <div class="faq-content-list" id="SN-03">
                <h4 class="faq-content-title">CBD Shampoo FAQ</h4>
                <div class="list-faq"></div>
            </div>
            <div class="faq-content-list" id="SN-04">
                <h4 class="faq-content-title">CBD Shampoo FAQ</h4>
                <div class="list-faq"></div>
            </div>
            <div class="faq-content-list" id="SN-05">
                <h4 class="faq-content-title">CBD Shampoo FAQ</h4>
                <div class="list-faq"></div>
            </div>
            <div class="faq-content-list" id="SN-06">
                <h4 class="faq-content-title">CBD Shampoo FAQ</h4>
                <div class="list-faq"></div>
            </div>   
    `

    const faqTabContainer = document.querySelector('.faq-tab')
    const faqListContainer = document.querySelector('.faq-contents')

    // Insert HTML tabs and content
    faqTabContainer.innerHTML = faqTabs;
    faqListContainer.innerHTML = faqContentList;

    // Get all tab links
    const tabLinks = document.querySelectorAll('.tablinks');
    const allFaqBlocks = document.querySelectorAll('.faq-content-list');

    // Event delegation for tab clicks
    tabLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const selectedId = this.dataset.id;

            // Step 1: Remove all "active" classes
            tabLinks.forEach(tab => tab.classList.remove('active'));
            allFaqBlocks.forEach(block => block.style.display = 'none');

            // Step 2: Set current tab as active
            this.classList.add('active');

            // Step 3: Show selected FAQ block
            if (selectedId === 'allFaq') {
                document.getElementById('allFAQ').style.display = 'block';
            } else {
                const product = allProducts.find(p => p.id === selectedId);
                const contentBlock = document.getElementById(selectedId);
                const faqList = contentBlock.querySelector('.list-faq');

                // Clear any previous content
                faqList.innerHTML = '';

                if (product?.faq?.length > 0) {
                    product.faq.forEach((faq, i) => {
                        const faqItem = `
                        <div class="faq-item ${i === 0 ? 'active' : ''}">
                        <div class="faq-question">
                            <h4>${faq.question}</h4>
                            <span class="material-symbols-outlined">keyboard_arrow_down</span>
                        </div>
                        <div class="faq-answer">
                            <p>${faq.answer}</p>
                        </div>
                        </div>
                        `;
                        faqList.insertAdjacentHTML('beforeend', faqItem);
                    });
                } else {
                    faqList.innerHTML = '<p>No FAQs available for this product.</p>';
                }
                contentBlock.style.display = 'block';
            }
        });
    });

    const faqTitles = document.querySelectorAll('.faq-content-title')
    const faqLinks = document.querySelectorAll('.tablinks')
    faqTitles.forEach((title, index) => {
        title.innerHTML = faqLinks[index].innerHTML
    })
    

    document.querySelector('.tablinks.active')?.click();

})()