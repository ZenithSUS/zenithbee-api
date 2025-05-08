import {
  getProducts,
  getProductsByLength,
  getPopularProducts,
} from "../appwrite/product.js";

export const fetchProducts = async () => {
  const products = await getProducts();

  return products.map((item) => ({
    $id: item.$id,
    name: item.name,
    description: item.description,
    image: item.image,
    price: item.price,
    foodType: item.foodType,
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
  }));
};

export const fetchPopularProducts = async () => {
  const products = await getPopularProducts();
  return products;
};

export const tools = [
  {
    type: "function",
    function: {
      name: "fetchProducts",
      description: "Get all products in ZenithBee",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "fetchProductByLength",
      description:
        "Fetch a specific number of food products from ZenithBee based on the user's requested amount.",
      parameters: {
        type: "object",
        properties: {
          length: {
            type: "number",
            description: "The number of products to retrieve.",
          },
        },
        required: ["length"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "fetchPopularProducts",
      description: "Fetch the popular products from ZenithBee",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
];
