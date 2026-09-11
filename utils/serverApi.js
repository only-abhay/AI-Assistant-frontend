import { cookies } from "next/headers";

const serverApi = async () => {
  try {
    const token = (await cookies()).get("jwt")?.value;
    if (!token) return { success: false, user: null };

    const backendUrl =
      process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${backendUrl}/api/user/get-me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) return { success: false, user: null };

    const data = await response.json();
    return data.success
      ? { success: true, user: data.user }
      : { success: false, user: null };
  } catch (error) {
    return { success: false, user: null };
  }
};

export default serverApi;
