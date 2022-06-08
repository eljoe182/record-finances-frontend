import API from "./api";

export const signIn = async ({ email, password }) => {
  const response = await API.post({
    path: "/auth/login",
    body: {
      email,
      password,
    },
  })
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem("recFin-token", token);
      return response;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

export const signUp = async ({ email, password, username }) => {
  const response = await API.post({
    path: "/auth/signup",
    body: {
      email,
      password,
      username,
    },
  }).then((response) => {
    return response;
  });
  return response;
};

export const forgotPassword = async ({ email }) => {
  const response = await API.post({
    path: "/auth/forgot-password",
    body: {
      email,
    },
  }).then((response) => {
    return response;
  });
  return response;
};

export const resetPassword = async ({ password, token }) => {
  const response = await API.post({
    path: "/auth/reset-password",
    body: {
      password,
      token,
    },
  }).then((response) => {
    return response;
  });
  return response;
};
