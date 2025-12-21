import api from "./axios";

export const getProducts = (params = {}) => {
  return api.get("/products/", { params });
};


export const getProductId =(params)=>{
  return api.get(`/products/${params}`)
}