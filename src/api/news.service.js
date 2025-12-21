import api from "./axios";

export const getNews = (params = {}) => {
  return api.get("/news/", {
    params,
  });
};
