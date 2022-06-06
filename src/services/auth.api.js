import API from "./api";

export const signIn = async ({ email, password }) => {
  const response = await API.post({
    path: "/auth/login",
    body: {
      email,
      password,
    },
  }).then((response) => {
    const { token } = response.data;
    localStorage.setItem("recFin-token", token);
    return response;
  });
  return response;
};
