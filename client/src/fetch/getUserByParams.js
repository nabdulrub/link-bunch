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
      console.error(
        `Request failed with status ${response.status}:`,
        await response.text()
      );
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
