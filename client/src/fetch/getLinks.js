import { getToken } from "../hooks/useAuth";

export const getLinks = async () => {
  try {
    const token = getToken();

    const response = await fetch("/api/links", {
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
