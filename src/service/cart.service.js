import api from "../api/axios";

export const getCart = () => {
  return api.get("/customer/cart/");
};

export const addToCart = (productId, quantity = 1) => {
  return api.post(`/customer/cart/add/${productId}`, {
     product_id: productId, 
    quantity
  });
};

export const updateCartItem = (cartItemId, quantity) => {
  return api.patch(`/customer/cart/item/${cartItemId}/`, {
    quantity,
  });
};

export const removeCartItem = (cartItemId) => {
  return api.delete(`/customer/cart/item/${cartItemId}/`);
};