const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchConToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};

const emptyImage =
  "data:image/jpeg;base64,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";

export { fetchSinToken, fetchConToken, emptyImage };
