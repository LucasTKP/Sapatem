import { CategoriesContext } from "../context/categories";
import {
  CategoryContextModel,
  createCategoryContext,
} from "../models/category";
import categoryService from "../services/category_service";

async function getCategories(): Promise<CategoryContextModel[]> {
  try {
    const response = await categoryService.getAllCategories();
    const allCategories = response.data.map((productData: any) => {
      return createCategoryContext({
        id: productData.id,
        name: productData.name,
      });
    });

    const categoriesFilteredBySapatem =
      filterCategoriesBySapatem(allCategories);
    const categoriesSapatem = await verifyCategories(
      categoriesFilteredBySapatem
    );

    return categoriesSapatem;
  } catch (e) {
    console.error(e);
    return [];
  }
}

function filterCategoriesBySapatem(
  categories: CategoryContextModel[]
): CategoryContextModel[] {
  return categories.filter((category) => category.name.includes("Sapatem"));
}

const categoryController = {
  getCategories,
};

async function verifyCategories(
  categories: CategoryContextModel[]
): Promise<CategoryContextModel[]> {
  const categoriesSapatem: CategoryContextModel[] = [];

  const categoryShoes = categories.find(
    (category) => category.name === "Sapatos-Sapatem"
  );

  if (!categoryShoes) {
    const response = await categoryService.createCategory("Sapatos-Sapatem");
    categoriesSapatem.push({ id: response.data.id, name: response.data.name });
  } else {
    categoriesSapatem.push(categoryShoes);
  }

  const categoryWallets = categories.find(
    (category) => category.name === "Carteiras-Sapatem"
  );

  if (!categoryWallets) {
    const response = await categoryService.createCategory("Carteiras-Sapatem");
    categoriesSapatem.push({ id: response.data.id, name: response.data.name });
  } else {
    categoriesSapatem.push(categoryWallets);
  }

  const categoryBelts = categories.find(
    (category) => category.name === "Cintos-Sapatem"
  );
  if (!categoryBelts) {
    const response = await categoryService.createCategory("Cintos-Sapatem");
    categoriesSapatem.push({ id: response.data.id, name: response.data.name });
  } else {
    categoriesSapatem.push(categoryBelts);
  }

  return categoriesSapatem;
}

export default categoryController;
