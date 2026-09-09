import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

export const generateBlog = async (blogData) =>
  await api.post('/api/blog/generate', blogData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
export const QandAQuestion = async (formData) => await api.post('/api/resume/qa',formData)
export const verifyOtp = async (email, otp) => await api.post('/api/user/verify-otp', { email, otp });

export default api;
