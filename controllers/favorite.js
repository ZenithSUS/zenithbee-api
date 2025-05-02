import {
  createFavorite,
  deleteFavorite,
  getFavorites,
} from "../appwrite/favorites.js";

export const addFavorite = async (req, res) => {
  try {
    if(!req.body) {
      return res.status(400).json({
        message: "Unprocessable Entity",
      });
    }
    
    await createFavorite(req.body);
    return res.status(200).json({
      message: "Favorite Created!"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const fetchFavorites = async (req, res) => {
  try {
    const id = req.query.id;
    const favorites = await getFavorites(id);
    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};


export const removeFavorite = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteFavorite(id);
    return res.status(200).json({
      message: "Favorite Deleted!",
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};