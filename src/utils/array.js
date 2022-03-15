export function chooseAnIndex(arrayLength, date) {
  const curDay = () => {
    var a = new Date(date).setHours(0, 0, 0, 0);

    return Math.floor((a - new Date(2022, 2, 11, 0, 0, 0, 0)) / 864e5);
  };
  return curDay() % arrayLength;
}
