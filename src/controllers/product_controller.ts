import { createProduct, Product } from "../models/product";
import productService from "../services/product_service";

async function getProductsByCategory(
  categoryId: number
): Promise<Array<Product>> {
  const response = await productService.getProductsByCategory(categoryId);
  const products = response.data.map((productData: any) => {
    return createProduct({
      id: productData.id,
      title: productData.title,
      price: productData.price,
      description: productData.description,
      category: productData.category,
      images: productData.images,
    });
  });

  return products;
}

function sortProductsByNameAscending(products: Product[]): Product[] {
  return products.sort((a, b) => a.title.localeCompare(b.title));
}
function sortProductsByNameDescending(products: Product[]): Product[] {
  return products.sort((a, b) => b.title.localeCompare(a.title));
}

function sortProductsByPriceAscending(products: Product[]): Product[] {
  return products.sort((a, b) => a.price - b.price);
}

function sortProductsByPriceDescending(products: Product[]): Product[] {
  return products.sort((a, b) => b.price - a.price);
}

const productController = {
  getProductsByCategory,
  sortProductsByNameAscending,
  sortProductsByNameDescending,
  sortProductsByPriceAscending,
  sortProductsByPriceDescending,
};

export default productController;
