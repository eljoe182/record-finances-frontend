import API from "./api";

export const getProfile = async () => {
  return API.get({
    path: "/profile",
    secure: true,
  });
};
