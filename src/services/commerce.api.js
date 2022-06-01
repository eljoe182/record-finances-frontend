import API from "./api";

export const findByDescription = async (description) => {
  return API.get({
    path: `/commerce/find/${description}`,
    secure: true,
  });
};
