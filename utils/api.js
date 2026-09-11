import axios from "axios";

const api = axios.create({
  baseURL: "",
  withCredentials: true,
});

export const generateBlog = async (blogData) =>
  await api.post('/api/blog/generate', blogData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
export const QandAQuestion = async (formData) => await api.post('/api/resume/qa',formData)
export const getMyBlogs = async () => await api.get('/api/blog/my-blogs')
export const getMyQuestions = async () => await api.get('/api/resume/my-questions')
export const verifyOtp = async (email, otp) => await api.post('/api/user/verify-otp', { email, otp });
export const Logout = async () => await api.get("/api/user/logout")

export default api;
