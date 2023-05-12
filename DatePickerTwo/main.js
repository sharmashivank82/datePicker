const date_picker_element = document.querySelector(".date-picker");
const selected_date_element = document.querySelector(
  ".date-picker .selected-date"
);
const date_element = document.querySelector(".date-picker .dates");
const mth_element = document.querySelector(".date-picker .dates .month .mth");
const next_mth_element = document.querySelector(
  ".date-picker .dates .month .next-mth"
);
const prev_mth_element = document.querySelector(
  ".date-picker .dates .month .prev-mth"
);
const days_element = document.querySelector(".date-picker .dates .days");

const months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var daysLeft = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

let numberofDays = new Date(year, month + 1, 0).getDate();
let firstDay = days[new Date(`${month + 1}-1-${year}`).getDay()]; //month-date-year

//example
// var d = new Date('05-01-2023');
// var dayName = days[d.getDay()];

mth_element.textContent = months[month] + " " + year;
selected_date_element.textContent = formatDate(date);

// Event Listener
date_picker_element.addEventListener("click", toggleDatePicker);
next_mth_element.addEventListener("click", gotoNextMonth);
prev_mth_element.addEventListener("click", gotoPrevMonth);
populateDates();

// Functions
function toggleDatePicker(e) {
  if (!checkEventPathForClass(e.composedPath(), "dates"))
    date_element.classList.toggle("active");
}

function gotoNextMonth(e) {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  mth_element.textContent = months[month] + " " + year;
  numberofDays = new Date(year, month + 1, 0).getDate();
  firstDay = days[new Date(`${month + 1}-1-${year}`).getDay()];
  populateDates();
}

function gotoPrevMonth(e) {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  mth_element.textContent = months[month] + " " + year;
  numberofDays = new Date(year, month + 1, 0).getDate();
  firstDay = days[new Date(`${month + 1}-1-${year}`).getDay()];
  populateDates();
}

function populateDates() {
  days_element.innerHTML = "";

  console.log({ firstDay, daysLeft: daysLeft[firstDay] });

  for (let i = 0; i < daysLeft[firstDay]; i++) {
    const day_element = document.createElement("div");
    day_element.textContent = " ";
    days_element.appendChild(day_element);
  }

  for (let i = 0; i < numberofDays; i++) {
    const day_element = document.createElement("div");
    day_element.classList.add("day");
    day_element.textContent = i + 1;
    if (
      selectedDay === i + 1 &&
      selectedYear === year &&
      selectedMonth === month
    ) {
      day_element.classList.add("selected");
    }
    day_element.addEventListener("click", function () {
      selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;
      selected_date_element.textContent = formatDate(selectedDate);
      selected_date_element.dataset.value = selectedDate;
      populateDates();
    });
    days_element.appendChild(day_element);
  }
}

function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }
  return false;
}

function formatDate(d) {
  let day = d.getDate();
  if (day < 10) day = `0${day}`;
  let month = d.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  let year = d.getFullYear();

  return `${day} / ${month} / ${year}`;
}
