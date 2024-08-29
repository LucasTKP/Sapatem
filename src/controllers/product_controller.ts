import { createProduct, Product } from "../models/product";
import productService from "../services/product_service";

async function getProductsByCategory(categoryId: number) : Promise<Array<Product>> {
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

const productController = {
  getProductsByCategory,
};

export default productController;
