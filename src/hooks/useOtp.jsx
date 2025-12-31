import { useState } from "react";
import OtpService from "../service/auth.otp.service";

export const useOtp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestOtp = async (phone, fullName) => {
    setLoading(true);
    setError(null);
    try {
      const data = await OtpService.sendOtp(phone, fullName);
      return { success: true, data };
    } catch (err) {
      const msg = err.response?.data?.message || "Kodni yuborishda xatolik";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (phone, code) => {
    setLoading(true);
    setError(null);
    try {
      const data = await OtpService.verifyOtp(phone, code);
      return { success: true, data };
    } catch (err) {
      const msg = err.response?.data?.message || "Kod noto'g'ri";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  return { requestOtp, verifyOtp, loading, error };
};