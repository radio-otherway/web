const getMonthName = (date: string) => {
  return new Date(date).toLocaleString("default", { month: "short" });
};
const getTime = (date: string) =>
  new Date(date).toLocaleTimeString("en-IE", { timeStyle: "short" });

const getStartOfToday = (admin: any) => {
  const now = new Date();
  now.setHours(5, 0, 0, 0); // +5 hours for Eastern Time
  const timestamp = admin.firestore.Timestamp.fromDate(now);
  return timestamp; // ex. 1631246400
};
const dateDifferenceInSeconds = (date1: Date, date2: Date) =>
  Math.abs((date1.getTime() - date2.getTime())) / 1000;

const addSeconds = (date: Date, seconds: number) => {
  date.setSeconds(date.getSeconds() + seconds);
  return date;
};
export { getMonthName, getTime, getStartOfToday, dateDifferenceInSeconds, addSeconds };
