export const generateArrayOfDays = (max) => {
  let days = [];
  for (let i = max; i > 0; i--) {
    days.push(i);
  }
  return days;
};

const monthMap = {
  January: generateArrayOfDays(31),
  February: generateArrayOfDays(28),
  March: generateArrayOfDays(31),
  April: generateArrayOfDays(30),
  May: generateArrayOfDays(31),
  June: generateArrayOfDays(30),
  July: generateArrayOfDays(31),
  August: generateArrayOfDays(31),
  September: generateArrayOfDays(30),
  October: generateArrayOfDays(31),
  November: generateArrayOfDays(30),
  December: generateArrayOfDays(31),
};

const months = [
  { name: 'January', days: generateArrayOfDays(31) },
  { name: 'February', days: generateArrayOfDays(29) },
  { name: 'March', days: generateArrayOfDays(31) },
  { name: 'April', days: generateArrayOfDays(30) },
  { name: 'May', days: generateArrayOfDays(31) },
  { name: 'June', days: generateArrayOfDays(30) },
  { name: 'July', days: generateArrayOfDays(31) },
  { name: 'August', days: generateArrayOfDays(31) },
  { name: 'September', days: generateArrayOfDays(30) },
  { name: 'October', days: generateArrayOfDays(31) },
  { name: 'November', days: generateArrayOfDays(30) },
  { name: 'December', days: generateArrayOfDays(31) },
];

const generateYears = () => {
  let max = new Date().getFullYear();
  let min = max - 100;
  let years = [];

  for (let i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

const years = generateYears();

export { months, years, monthMap };
