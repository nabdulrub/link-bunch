export const getUserByParams = async ({ id }) => {
  try {
    const response = await fetch(`/api/public/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
