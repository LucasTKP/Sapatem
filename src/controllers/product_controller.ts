import { createProduct, ProductModel } from "../models/product";
import productService from "../services/product_service";

async function getProductsByCategory(
  categoryId: number
): Promise<Array<ProductModel>> {
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

function sortProductsByCategoryAscending(
  products: ProductModel[]
): ProductModel[] {
  return products.sort((a, b) => a.category.name.localeCompare(b.category.name));
}
function sortProductsByCategoryDescending(
  products: ProductModel[]
): ProductModel[] {
  return products.sort((a, b) => b.category.name.localeCompare(a.category.name));
}

function sortProductsByPriceAscending(
  products: ProductModel[]
): ProductModel[] {
  return products.sort((a, b) => a.price - b.price);
}

function sortProductsByPriceDescending(
  products: ProductModel[]
): ProductModel[] {
  return products.sort((a, b) => b.price - a.price);
}

interface SearchProductsProps {
  products: ProductModel[];
  textSearch: string;
}

export function searchProducts({
  products,
  textSearch,
}: SearchProductsProps): ProductModel[] {
  const productsFiltered = products.filter((product) =>
    product.title.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())
  );
  return productsFiltered;
}

const productController = {
  getProductsByCategory,
  sortProductsByCategoryAscending,
  sortProductsByCategoryDescending,
  sortProductsByPriceAscending,
  sortProductsByPriceDescending,
  searchProducts,
};

export default productController;
