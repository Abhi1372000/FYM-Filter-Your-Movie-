// https://api.themoviedb.org/3/discover/movie

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODM4ZDM2ZmY3NDZiNjJhMTg0ZWQ3YmI1ZGY3NDU4NiIsInN1YiI6IjY1MmJjNmY4MzU4ZGE3MDEwMGMxODdjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jpHB0zNsJMZC9DD6-LX862N52sSdUgYxHl_08-NQ7PA";
const BASE_API = "https://api.themoviedb.org/3";
const IMAGE_BASE_API = `https://image.tmdb.org/t/p/w500`;
const paging = "?page=";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

async function fetchGenere() {
  const endpoint = "/genre/movie/list";
  // const apiUrl =  `${BASE_API}${endpoint}`;
  let result = [];
  await axios
    .get(`${BASE_API}${endpoint}`, { headers })
    .then((response) => {
      result = response.data.genres;
    })
    .catch((error) => {
      result = ("genres", error);
    });
  return result;
}

let geners = fetchGenere();

// console.log("list gene", geners);

let contentSwitchFlag = true;

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let totalPages = 100;

const tvSwitch = document.querySelector(".tvShowsSwitche");
const moviesSwitch = document.querySelector(".moviesSwitch");
const movieCardContainer = document.querySelector(".movieCardContainer");

const sortMnu = document.querySelector("#sortMenu");
const sortBtn = document.querySelector("#optionSort");
const filterBtn = document.querySelector("#optionFilter");
const filterMenu = document.querySelector("#filterMenu");
const filterBtnClose = document.querySelector(".okBtnClose");
const sortBtnClose = document.querySelector(".sortBtn");

const prevPgEle = document.querySelector(".prevPage");
const nextPgEle = document.querySelector(".nextPage");
const currentPgEle = document.querySelector(".currentPage");

nextPgEle.addEventListener("click", () => {
  currentPage += 1;
  fetchData();
  currentPgEle.innerText = `${currentPage}`;
});
prevPgEle.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    fetchData();
    currentPgEle.innerText = `${currentPage}`;
  }
});

filterBtn.addEventListener("click", () => {
  filterMenu.style.display = "block";
});

sortBtn.addEventListener("click", () => {
  if (filterMenu.style.display === "none") {
    sortMnu.style.display = "block";
  }
});

function okBtnfun() {
  if (filterMenu.style.display === "block") {
    filterMenu.style.display = "none";
  }
}

filterBtnClose.addEventListener("click", okBtnfun);

sortBtnClose.addEventListener("click", () => {
  if (sortMnu.style.display === "block") {
    sortMnu.style.display = "none";
  }
});

function contentToRender() {
  if (contentSwitchFlag === true) {
    console.log("movie");
    moviesSwitch.style.backgroundColor = "red";
    tvSwitch.style.backgroundColor = "black";
    fetchData();
  } else {
    console.log("tv-Show");
    tvSwitch.style.backgroundColor = "red";
    moviesSwitch.style.backgroundColor = "black";
    fetchData();
  }
}

tvSwitch.addEventListener("click", () => {
  if (contentSwitchFlag === true) {
    contentSwitchFlag = false;
    contentToRender();
  }
});

moviesSwitch.addEventListener("click", () => {
  if (contentSwitchFlag === false) {
    contentSwitchFlag = true;
    contentToRender();
  }
});

function loadMOviesTOContent(data) {
  movieCardContainer.innerHTML = "";
  console.log("this load function", data, typeof data);
  const moviesArr = data.results;
  moviesArr.forEach((ele) => {
    console.log(ele);
    const movieCard = document.createElement("div");
    movieCard.setAttribute("class", "movieCard");
    movieCard.innerHTML = `<div class="movieDetails">
    <div class="titleRating">
      <p class="title">${contentSwitchFlag ? ele.title : ele.name}</p>
      <p class="rating"><i class="fa-solid fa-star fa-lg" style="color: #fab005;"></i>${
        ele.vote_average
      }</p>
    </div>
    <div>
      <h3>Plot Overview</h3>
      <p>${ele.overview}</p>
    </div>
  </div>
  <div class="cardImage">
    <img src="${IMAGE_BASE_API}${ele.poster_path}" alt="">
  </div>`;

    movieCardContainer.appendChild(movieCard);
  });
  // data.array.forEach(element => {

  // });
}

async function fetchData() {
  let endpoint = "";
  if (contentSwitchFlag) {
    endpoint = "/discover/movie";
  } else {
    endpoint = "/discover/tv";
  }

  // const apiUrl =  `${BASE_API}${endpoint}`;

  await axios
    .get((URL = `${BASE_API}${endpoint}${paging}${currentPage}`), { headers })
    .then((response) => {
      const result = response.data;
      console.log("The result", result);
      console.log(URL);
      if (result.results.length !== 0) {
        loadMOviesTOContent(result);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function onWindowLoad() {
  fetchGenere();
  contentToRender();
}

window.onload = onWindowLoad;
