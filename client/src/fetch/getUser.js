import { getSession, getToken } from "../hooks/useAuth";

export const getUser = async () => {
  try {
    const session = getSession();
    const token = getToken();

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({ userId: session.id }),
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
