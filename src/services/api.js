class API {
  #server;

  constructor() {
    this.#server = import.meta.env.PROD
      ? import.meta.env.VITE_API_URL
      : import.meta.env.VITE_API_URL_DEV;
  }

  get({ path, headers: extraHeaders = {}, secure = false }) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const headersSecure = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("recFin-token")}`,
      ...extraHeaders,
    };

    return fetch(`${this.#server}${path}`, {
      method: "GET",
      headers: secure ? headersSecure : headers,
    })
      .then((response) => {
        const { ok } = response;
        if (ok) {
          return response.json();
        }
        throw response;
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  post({ path, body = {}, headers: extraHeaders = {}, secure = false }) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const headersSecure = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("recFin-token")}`,
      ...extraHeaders,
    };

    return fetch(`${this.#server}${path}`, {
      method: "POST",
      headers: secure ? headersSecure : headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((response) => {
        return response;
      })
      .catch(async (error) => {
        if (error.status === 500) {
          throw error;
        }
        const { message } = await error.json();
        throw new Error(message);
      });
  }

  put({ path, body = {}, headers: extraHeaders = {}, secure = false }) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const headersSecure = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("recFin-token")}`,
      ...extraHeaders,
    };

    return fetch(`${this.#server}${path}`, {
      method: "PUT",
      headers: secure ? headersSecure : headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  delete({ path, headers: extraHeaders = {}, secure = false }) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const headersSecure = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("recFin-token")}`,
      ...extraHeaders,
    };

    return fetch(`${this.#server}${path}`, {
      method: "DELETE",
      headers: secure ? headersSecure : headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default new API();
