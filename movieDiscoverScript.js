let contentSwitchFlag = true;

const tvSwitch = document.querySelector(".tvShowsSwitche");
const moviesSwitch = document.querySelector(".moviesSwitch");

const sortMnu = document.querySelector("#sortMenu");
const sortBtn = document.querySelector("#optionSort");
const filterBtn = document.querySelector("#optionFilter");
const filterMenu = document.querySelector("#filterMenu");
const filterBtnClose = document.querySelector(".okBtnClose");
const sortBtnClose = document.querySelector(".sortBtn");

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
  } else {
    console.log("tv-Show");
    tvSwitch.style.backgroundColor = "red";
    moviesSwitch.style.backgroundColor = "black";
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

function onWindowLoad() {
  contentToRender();
}

window.onload = onWindowLoad;
