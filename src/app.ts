import { iData } from "./@types";

const tableBody: any = document.querySelector("tbody[data-sink]");
const pageView: any = document.querySelector("label[data-pageview]");
const previousButton = document.querySelector("button[data-prevbtn]");
const nextButton: any = document.querySelector("button[data-nextbtn]");
const API_URL = "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84";
let page: number = 1;
let data: Array<iData> = [];

previousButton?.addEventListener("click", () => {
  page -= 1;
  fetchData(`&page=${page}`);
});

nextButton?.addEventListener("click", () => {
  page += 1;
  isLoader(true);
  fetchData(`&page=${page}`);
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

const renderTable = () => {
  for (let i = 0; i < data.length; i++) {
    let tableRow = document.createElement("tr");
    tableRow.setAttribute("data-entryid", data[i].id);
    tableRow.innerHTML = `
      <td>${data[i].row}</td>
      <td>${data[i].gender}</td>
      <td>${data[i].age}</td>
      `;

    if (tableBody?.nextSibling) {
      tableBody.replaceChildren(tableRow);
    }

    setTimeout(() => {
      tableBody?.appendChild(tableRow);
    }, 0);
  }

  if (page === 1) {
    previousButton?.setAttribute("disabled", "true");
  } else {
    previousButton?.removeAttribute("disabled");
  }
};

const fetchData = async (query = "") => {
  try {
    const response = await fetch(`${API_URL}${query}`);
    const jsonData = await response?.json();
    data = jsonData?.results[0][page];
    page = +jsonData?.info?.page;
    pageView.textContent = `Showing Page ${page}`;
    isLoader();
    renderTable();
  } catch (error) {
    throw new Error(error);
  }
};

const startApp = async () => {
  await fetchData();
};

document.addEventListener("DOMContentLoaded", startApp);
