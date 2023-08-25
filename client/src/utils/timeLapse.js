export default function timeLapse(date) {
  const myDate = new Date(date);
  const actualDate = new Date();
  console.log(Number(actualDate) - Number(myDate));
  return Number(actualDate) - Number(myDate);
}
