import { iData } from "./@types";

const tableBody = document.querySelector("tbody[data-sink]");
const pageView: any = document.querySelector("label[data-pageview]");
const previousButton = document.querySelector("button[data-prevbtn]");
const nextButton = document.querySelector("button[data-nextbtn]");
const API_URL = "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84";
let page: number = 0;
let data: Array<iData> = [];

previousButton?.addEventListener("click", () => {
  if (page === 1) {
    previousButton.setAttribute("disabled", "true");
    return;
  }
  console.log("Hey Previous");
  fetchData(`&page=${page - 1}`);
});

nextButton?.addEventListener("click", () => {
  console.log("Hey Next");
  fetchData(`&page=${page + 1}`);
});

const fetchData = async (query = "") => {
  try {
    const response = await fetch(`${API_URL}${query}`);
    const jsonData = await response.json();
    data = jsonData.results[0][1];
    page = +jsonData.info.page;

    console.log("Here<><><><><>", jsonData);
  } catch (error) {
    throw new Error(error);
  }
};

const renderTable = () => {
  data.map((user) => {
    let tableRow = document.createElement("tr");
    tableRow.setAttribute("data-entryid", user.id);
    const recordValues = Object.values(user).slice(1);
    recordValues.forEach((record) => {
      let tableCell: any = document.createElement("td");
      tableCell.innerText = record;

      tableRow.appendChild(tableCell);
    });

    tableBody?.appendChild(tableRow);
  });
  pageView.textContent = page;
};

const startApp = async () => {
  await fetchData();
  renderTable();
};

document.addEventListener("DOMContentLoaded", startApp);
