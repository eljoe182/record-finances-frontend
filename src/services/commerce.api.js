import API from "./api";

export const store = async ({ description }) => {
  return API.post({
    path: "/commerce/store",
    data: {
      description,
    },
    secure: true,
  });
};

export const findByDescription = async (description) => {
  return API.get({
    path: `/commerce/find/${description}`,
    secure: true,
  });
};
