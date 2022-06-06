import API from "./api";

export const findByDescription = async (description) => {
  return API.get({
    path: `/products/find/${description}`,
    secure: true,
  });
};
