import api from "./axios";

export const getCart = () => {
  return api.get("/cart/");
};

export const addToCart = (productId, quantity = 1) => {
  // Miqdor 1 dan kam bo'lmasligini tekshirish
  const safeQuantity = quantity < 1 ? 1 : quantity;
  return api.post("/customer/cart", {
    product_id: productId,
    quantity: safeQuantity,
  });
};

// Miqdorni o'zgartirish
export const updateCartItem = (cartItemId, quantity) => {
  return api.patch(`/cart/item/${cartItemId}/`, {
    quantity,
  });
};

// Savatdan o'chirish
export const removeCartItem = (cartItemId) => {
  return api.delete(`/cart/item/${cartItemId}/`);
};