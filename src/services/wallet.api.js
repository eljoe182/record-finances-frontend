import API from "./api";

export const getAll = async () => {
  const response = await API.get({
    path: "/wallet",
    secure: true,
  }).then((response) => {
    return response;
  });
  return response;
};

export const store = async (data) => {
  const response = await API.post({
    path: "/wallet/store",
    secure: true,
    body: data,
  }).then((response) => {
    return response;
  });
  return response;
};

export const update = async ({ id, data }) => {
  const response = await API.put({
    path: `/wallet/update/${id}`,
    secure: true,
    body: data,
  }).then((response) => {
    return response;
  });
  return response;
};

export const destroy = async (id) => {
  const response = await API.delete({
    path: `/wallet/delete/${id}`,
    secure: true,
  }).then((response) => {
    return response;
  });
  return response;
};
