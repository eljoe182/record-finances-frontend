import API from "./api";

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
