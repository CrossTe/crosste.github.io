export function getDayHash(ref = null) {
  const date1 = new Date("03/11/2022");
  const date2 = ref ? new Date(ref) : new Date();

  // To calculate the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  return Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
}
