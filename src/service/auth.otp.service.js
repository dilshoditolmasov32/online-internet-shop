import api from "../api/axios";


const OtpService = {
 async sendOtp(phone, fullName) {
  const formattedPhone = phone.replace(/[^\d]/g, ""); 
  const response = await api.post("customer/otp/request", {
    username: formattedPhone,
    username: fullName
  });
  return response.data;
},

  async verifyOtp(phone, code) {
    const formattedPhone = phone.replace(/[^\d]/g, "");
    
    const response = await api.post("customer/otp/verify", {
      phone: formattedPhone,
      otp: code,
    });
    return response.data;
  }
};

export default OtpService;