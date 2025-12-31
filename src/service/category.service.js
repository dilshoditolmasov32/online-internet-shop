import api from "../api/axios";

export const getCategories = ( params = {}) => {
  return api.get(`categories`, { params });
};
