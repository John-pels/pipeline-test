//DOM Selectors

import { iRecord } from "./@types";

const tableBody = document.querySelector("tbody[data-sink]") as HTMLElement;
const pageView = document.querySelector("label[data-pageview]") as HTMLElement;
const previousButton = document.querySelector(
  "button[data-prevbtn]"
) as HTMLButtonElement;

const nextButton = document.querySelector(
  "button[data-nextbtn]"
) as HTMLButtonElement;

const placeholder = document.querySelector("[data-placeholder]") as HTMLElement;

const API_URL =
  "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=";
let page: number = 1;
let data: { [key: number]: Array<iRecord> } = {};

//previous button click event

previousButton?.addEventListener("click", () => {
  page -= 1;
  if (data[page]) {
    placeholder.textContent = "";
    renderTable(data[page]);
  } else {
    isLoader(true);
    fetchData();
  }
  handleDisablePrevButton();
});

//next button click event

nextButton?.addEventListener("click", () => {
  page += 1;
  if (data[page]) {
    placeholder.textContent = "";
    renderTable(data[page]);
  } else {
    isLoader(true);
    fetchData();
  }
  handleDisablePrevButton();
});

const isLoader = (isLoad = false) => {
  if (isLoad) {
    nextButton.setAttribute("disabled", "true");
    nextButton.innerHTML = "Loading Data...";
  } else {
    nextButton.innerHTML = "Next";
    nextButton.removeAttribute("disabled");
  }
};

const handleDisablePrevButton = () => {
  if (page <= 1) {
    previousButton?.setAttribute("disabled", "true");
  } else {
    previousButton?.removeAttribute("disabled");
  }
};

const renderTable = (record: Array<iRecord>) => {
  tableBody.innerHTML = "";
  isLoader(false);
  for (let i = 0; i < record.length; i++) {
    tableBody.innerHTML += `
  <tr  data-entryid=${record[i].id}>
    <td>${record[i].row}</td>
    <td>${record[i].gender}</td>
    <td>${record[i].age}</td>
  </tr>
    `;
  }

  pageView.innerHTML = `Showing Page ${page}`;
};

const fetchData = async () => {
  try {
    placeholder.textContent = "You care for cookies? Now check it out!...";
    isLoader(true);
    const response = await fetch(`${API_URL}${page}`);
    const jsonData = await response.json();
    data = { ...data, ...jsonData.results[0] };
    renderTable(data[page]);
    placeholder.textContent = "";
  } catch (error) {
    page -= 1;
    placeholder.textContent = "Could not fetch data, please refresh.";
    throw new Error(error);
  }
};

const startApp = async () => {
  await fetchData();
};

document.addEventListener("DOMContentLoaded", startApp);
