import {
  getProducts,
  getProductsByLength,
  getPopularProducts,
  getProductsByAttribute,
} from "../appwrite/product.js";
import { getReservedByUserLimit } from "../appwrite/reserved.js";

export const fetchProducts = async () => {
  const products = await getProducts();

  return products.map((item) => ({
    $id: item.$id,
    name: item.name,
    description: item.description,
    image: item.image,
    price: item.price,
    foodType: item.foodType,
    rating: item.rating,
  }));
};

export const fetchProductByLength = async ({ length }) => {
  const products = await getProductsByLength(length);

  return products.map((item) => ({
    $id: item.$id,
    name: item.name,
    description: item.description,
    image: item.image,
    price: item.price,
    foodType: item.foodType,
    rating: item.rating,
  }));
};

export const fetchProductByAttribute = async ({ value }) => {
  const products = await getProductsByAttribute(value);

  return products.map((item) => ({
    $id: item.$id,
    name: item.name,
    description: item.description,
    image: item.image,
    price: item.price,
    foodType: item.foodType,
    rating: item.rating,
  }));
};

export const fetchPopularProducts = async () => {
  const products = await getPopularProducts();
  return products;
};

export const fetchReservedByLength = async ({ userId, length }) => {
  const reserved = await getReservedByUserLimit(userId, length);
  return reserved;
};
