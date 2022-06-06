import API from "./api";

export const store = async (data) => {
  return API.post({
    path: "/commerce/store",
    body: data,
    secure: true,
  });
};

export const findByDescription = async (description) => {
  return API.get({
    path: `/commerce/find/${description}`,
    secure: true,
  });
};
