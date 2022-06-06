const dateFormatOptions = {
  timeZone: "America/Santiago",
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-CL", dateFormatOptions);
};
