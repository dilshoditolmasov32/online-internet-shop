import api from "../api/axios";

export const getNews = (params = {}) => {
  return api.get("/news/", {
    params,
  });
};
