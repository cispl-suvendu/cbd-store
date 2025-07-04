export const fetchProducts = async (filter = ['all'], minPrice = 0, maxPrice = 100) => {
  try {
    const response = await fetch('/data/product.json');
    const data = await response.json();

    const products = data.products;

    let filteredProducts = filter.includes('all')
      ? products
      : products.filter(product =>
          product.tags.some(tag =>
            filter.some(f => tag.toLowerCase().includes(f.toLowerCase()))
          )
        );

    // ✅ Price filter (with safe parsing)
    filteredProducts = filteredProducts.filter(product => {
      const price = parseFloat(product.price); // Ensure numeric
      return price >= minPrice && price <= maxPrice;
    });

    return filteredProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
