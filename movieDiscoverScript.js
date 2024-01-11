// https://api.themoviedb.org/3/discover/movie

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODM4ZDM2ZmY3NDZiNjJhMTg0ZWQ3YmI1ZGY3NDU4NiIsInN1YiI6IjY1MmJjNmY4MzU4ZGE3MDEwMGMxODdjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jpHB0zNsJMZC9DD6-LX862N52sSdUgYxHl_08-NQ7PA";
const BASE_API = "https://api.themoviedb.org/3";
const IMAGE_BASE_API = `https://image.tmdb.org/t/p/w500`;
const paging = "?page=";
const genre = `&with_genres=`;

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

const movieGenersArr = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const seriesGenersArr = [
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  {
    id: 37,
    name: "Western",
  },
];

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
const generLst = document.querySelector(".generList");

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

let selectedGenres = [];

function okBtnfun() {
  let selectedGenres = [];
  if (filterMenu.style.display === "block") {
    const dataGenres = document.getElementsByClassName("generCheckBox");
    Object.values(dataGenres).forEach((gene) => {
      if (gene.checked) {
        selectedGenres.push(gene.value);
      }
    });
    fetchData();
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

function loadGenersInMenu() {
  movieGenersArr.forEach((ele) => {
    const generEle = document.createElement("label");
    const breakTag = document.createElement("br");
    generEle.setAttribute("class", "generName fltrOption");
    generEle.innerHTML = `<input type="checkbox" class="generCheckBox" value = "${ele.id}" id="${ele.name}${ele.id}"> ${ele.name}`;
    generLst.appendChild(generEle);
    generLst.appendChild(breakTag);
  });
}

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

  let apiUrl = `${BASE_API}${endpoint}${paging}${currentPage}`;
  if (selectedGenres.length !== 0) {
    apiUrl = `${BASE_API}${endpoint}${paging}${currentPage}${genre}${selectedGenres.join(
      ","
    )}`;
  }

  console.log("URL", apiUrl);

  await axios
    .get((URL = apiUrl), { headers })
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
  contentToRender();
  loadGenersInMenu();
}

window.onload = onWindowLoad;
