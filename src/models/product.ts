import { element } from './../../node_modules/@types/prop-types/index.d';
export interface ProductModel {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryModel;
  images: string[];
}

export function createProduct({
  id,
  title,
  price,
  description,
  category,
  images,
}: {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryModel;
  images: string[];
}): ProductModel {
  return {
    id,
    title,
    price,
    description,
    category,
    images: cleanImagesString(images),
  };
}

const cleanImagesString = (imagesInput: Array<string>) => {
  const urls: string[] = [];
  for(let element of imagesInput){
  const cleanedString = element.replace(/\\|\[|\]/g, "").replace(/"/g, "");
  urls.push(cleanedString);
  }

  return urls;
};
