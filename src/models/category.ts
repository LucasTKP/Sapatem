export interface CategoryModel {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface CategoryContextModel {
  id: number;
  name: string;
}

export function createCategoryContext({
  id,
  name,
}: {
  id: number;
  name: string;
}): CategoryContextModel {
  return {
    id,
    name,
  };
}
