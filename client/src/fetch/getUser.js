import { getToken } from "../hooks/useAuth";

export const getUser = async () => {
  try {
    const token = getToken();

    const response = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.ok) {
      return await response.json();
    }

    if (!response.ok) {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
