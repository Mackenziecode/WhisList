import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getWishlists = async () => {
  try {
    const response = await axios.get(`${API_URL}/wishlists`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener wishlists:", error);
    throw error;
  }
}; 

export const getWishlistById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/wishlists/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener wishlist ${id}:`, error);
    throw error;
  }
};

export const createWishlist = async (newWishlist) => {
  try {
    const response = await axios.post(`${API_URL}/wishlists`, newWishlist);
    return response.data;
  } catch (error) {
    console.error("Error al crear wishlist:", error);
    throw error;
  }
}; 

export const deleteWishlist = async (id) => {
  try {
    await axios.delete(`${API_URL}/wishlists/${id}`);
    return { success: true, id };
  } catch (error) {
    console.error(`Error al eliminar wishlist ${id}:`, error);
    throw error;
  }
};


export const addItem = async(wishlistId, item) => {
  try {
    const wishlist = await getWishlistById(wishlistId);
    const itemId = Math.floor(Math.random() * 100000);
    const newItem = {...item, id: itemId}
    wishlist.items.push(newItem);
    const response = await axios.put(`${API_URL}/wishlists/${wishlistId}`, wishlist);
    return response.data;
  } catch (error) {
    console.error("Error al agregar item:", error);
    throw error;
  }
}

export const deleteItem = async(wishlistId, itemId) => {
  try {
    const wishlist = await getWishlistById(wishlistId);
    wishlist.items = wishlist.items.filter(item => item.id !== itemId);
    const response = await axios.put(`${API_URL}/wishlists/${wishlistId}`, wishlist);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar item:", error);
    throw error;
  }
}

export const updateItem = async(wishlistId, itemId, updatedItem) => {
  try {
    const response = await axios.put(`${API_URL}/wishlists/${wishlistId}/items/${itemId}`, updatedItem);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar item:", error);
    throw error;
  }
}

