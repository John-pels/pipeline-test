const tableBody = document.querySelector("tbody[data-sink]") as HTMLElement;
const pageView = document.querySelector("label[data-pageview]") as HTMLElement;
const previousButton = document.querySelector(
  "button[data-prevbtn]"
) as HTMLButtonElement;
const nextButton = document.querySelector(
  "button[data-nextbtn]"
) as HTMLButtonElement;

const API_URL = "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84";
let page: number = 1;
let data: Array<any> = [];

previousButton?.addEventListener("click", async () => {
  page -= 1;
  data = [];
  await fetchData(`&page=${page}`);
  console.log("prev", page);
});

nextButton?.addEventListener("click", async () => {
  page += 1;
  data = [];
  console.log("next", page);
  isLoader(true);
  await fetchData(`&page=${page}`);
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
    tableRow?.setAttribute("data-entryid", data[i]?.id);
    tableRow.innerHTML = `
      <td>${data[i]?.row}</td>
      <td>${data[i]?.gender}</td>
      <td>${data[i]?.age}</td>
      `;

    if (tableBody?.nextSibling) {
      tableBody?.replaceChildren(tableRow);
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

  pageView.textContent = "Showing Page " + page;
};

const fetchData = async (query = "") => {
  try {
    const response = await fetch(API_URL + query);
    const jsonData = await response?.json();
    data = jsonData?.results[0][page];
    page = +jsonData?.info?.page;
    console.log("json", jsonData);
    console.log("page count", page);
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
