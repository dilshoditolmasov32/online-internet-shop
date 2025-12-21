import axios from "axios";

const api = axios.create({
  baseURL: "https://shop.milliybiz.uz/api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});



api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Faqat login sahifasida bo'lmasakgina yo'naltirishimiz kerak
      if (!window.location.pathname.includes("/login")) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }

    // Xatoni ob'ekt ko'rinishida qaytarish yaxshi, 
    // lekin original error ob'ektini ham saqlab qolgan ma'qul
    return Promise.reject({
      message: error.response?.data?.detail || error.response?.data?.message || "Server xatosi",
      status,
      data: error.response?.data,
    });
  }
);
export default api;
