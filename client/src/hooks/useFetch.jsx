const BASE_URL = "http://localhost:3000";

const makeApiCalls = async (url, method, data = null, token = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      options.headers["Authorization"] = `${token}`;
    }

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL + url, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error, Status: ${response.status}`);
    }

    return responseData;
  } catch (error) {
    console.error("Error making HTTP request:", error);
    throw error;
  }
};

export const api = {
  get: async (url, token = null) => makeApiCalls(url, "GET", null, token),

  post: async (url, data, token = null) =>
    makeApiCalls(url, "POST", data, token),

  put: async (url, data, token = null) => makeApiCalls(url, "PUT", data, token),

  delete: async (url, data, token = null) =>
    makeApiCalls(url, "DELETE", data, token),
};
