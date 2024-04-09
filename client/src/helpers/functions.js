export const roundDateToDay = (date) => {
  const roundedDate = new Date(date);
  roundedDate.setHours(12, 0, 0, 0);
  return roundedDate;
};
