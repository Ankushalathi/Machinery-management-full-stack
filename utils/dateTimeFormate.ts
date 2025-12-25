import moment from "moment";

export const formatedDateTimeIntoIst = (
  dateAndTime: string,
  format?: string ,
): string => {
  return moment(dateAndTime).format(format || "DD-MMM-yyyy - hh:mm A");
};
