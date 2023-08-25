export default function timeLapse(date) {
  const myDate = new Date(date);
  const actualDate = new Date();
  return Number(actualDate) - Number(myDate);
}
