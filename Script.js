const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const createArray = (length) => {
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(i);
  }
  return result;
};

const createData = () => {
  const current = new Date();
  current.setDate(1);

  const startDay = current.getDay();
  const daysInMonth = getDaysInMonth(current);

  const weeks = createArray(5);
  const days = createArray(7);

  const result = [];

  for (const weekIndex of weeks) {
    const value = {
      week: weekIndex + 1,
      days: [],
    };

    for (const dayIndex of days) {
      const day = dayIndex - startDay;
      const isValid = day > 0 && day <= daysInMonth;

      value.days.push({
        dayOfWeek: dayIndex + 1,
        value: isValid ? day : '',
      });
    }

    result.push(value);
  }

  return result;
};

const addCell = (existing, classString, value) => {
  return `${existing}
    <td ${classString}>
      ${value}
    </td>`;
};

const createHtml = (data) => {
  let result = '';

  for (const { week, days } of data) {
    let inner = '';
    inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`);

    for (const { dayOfWeek, value } of days) {
      let classString = 'table__cell';
      const isToday = new Date().getDate() === value;
      const isWeekend = dayOfWeek === 1 || dayOfWeek === 7;
      const isAlternate = week % 2 === 0;

      if (isToday) classString = `${classString} table__cell_today`;
      if (isWeekend) classString = `${classString} table__cell_weekend`;
      if (isAlternate) classString = `${classString} table__cell_alternate`;

      inner = addCell(inner, classString, value);
    }

    result = `${result}
      <tr>${inner}</tr>`;
  }

  return result;
};

const current = new Date();
const title = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;

const data = createData();
const html = createHtml(data);

console.log(title);
console.log(html);
