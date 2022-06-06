import API from "./api";

export const getAll = async () => {
  return API.get({
    path: "/purchase",
    secure: true,
  });
};

export const store = async (data) => {
  return API.post({
    path: "/purchase/store",
    body: data,
    secure: true,
  });
};

export const show = async (id) => {
  return API.get({
    path: `/purchase/show/${id}`,
    secure: true,
  });
};

export const destroy = async (id) => {
  return API.delete({
    path: `/purchase/destroy/${id}`,
    secure: true,
  });
};
