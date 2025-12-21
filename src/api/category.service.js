import api from "./axios";

export const getCategories = (params = {}) => {
  return api.get("/categories/", {
    params,
  });
};
