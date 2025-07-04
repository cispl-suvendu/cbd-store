/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BADAD7",
        secondary: "#D6C4D4",
        black: "#393939",
        blackLght: "#898989",
        white: "#ffffff",
        rating:'#FFA534'
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        serif: ['"Old Standard TT"', 'serif'],
      },
      backgroundImage: {
        homeHeroTop: "url(../images/bg-index-hero-top.jpg)",
        homeHeroBottom: "url(../images/bg-index-hero-btm.jpg)",
        homeCategory: "url(../images/bg-index-cat.jpg)",
        certified: "url(../images/bg-certified.jpg)",
        footerBg: "url(../images/logo-gray.svg)",
        shopHero: "url(../images/bg-shop.jpg)",
        howToUse: "url(../images/bg-how-to-use.png)",
        productFaq: "url(../images/bg-product-faq.png)",
        aboutHero: "url(../images/about-hero.jpg)",
        ourPromise: "url(../images/about-img-3.png)",
        faqHero: "url(../images/faq-hero.png)"
      },
      backgroundPosition:{
        centerTop: "center top",
        centerRight: "right 80px top 20px"
      },
    },
  },
  plugins: [],
}