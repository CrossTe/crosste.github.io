export function chooseAnIndex(arrayLength) {
  const curDay = () => {
    var a = new Date().setHours(0, 0, 0, 0);

    return Math.floor((a - new Date(2022, 2, 11, 0, 0, 0, 0)) / 864e5);
  };
  return curDay() % arrayLength;
}
