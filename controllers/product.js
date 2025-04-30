import { createProduct, getProducts } from "../appwrite/product.js";

export const addProduct = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Unprocessable Entity",
      });
    }

    const product = await createProduct(req.body);
    return res.status(200).json({
      message: "Product Created!",
      product,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
    console.error(error);
  }
};

export const fetchProducts = async (req, res) => {
  try {
    const filter = req.query.filter;

    const products = await getProducts();

    if (filter) {
      return res
        .status(200)
        .json(products.filter((p) => p.foodType === filter));
    } else {
      return res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
    console.error(error);
  }
};
