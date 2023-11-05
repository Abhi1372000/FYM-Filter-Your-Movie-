const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODM4ZDM2ZmY3NDZiNjJhMTg0ZWQ3YmI1ZGY3NDU4NiIsInN1YiI6IjY1MmJjNmY4MzU4ZGE3MDEwMGMxODdjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jpHB0zNsJMZC9DD6-LX862N52sSdUgYxHl_08-NQ7PA'
const BASE_API = 'https://api.themoviedb.org/3'
const IMAGE_BASE_API = `https://image.tmdb.org/t/p/w500`

const  headers = {
  accept: 'application/json',
  Authorization: `Bearer ${API_KEY}`
}

let contentSwitchFlag = true


async function fetchGenere() {
  const endpoint = '/genre/movie/list'
    // const apiUrl =  `${BASE_API}${endpoint}`;
    let result =  []
    await axios.get(`${BASE_API}${endpoint}`, {headers})
      .then(response => {
        console.log(response.data.genres)
      })
      .catch(error => {
        result = ("genres",error)
      });
      return result
    }





const tvSwitch = document.querySelector(".tvShowsSwitche")
const moviesSwitch = document.querySelector(".moviesSwitch")
const movieCardContainer = document.querySelector(".movieCardContainer")


function contentToRender(){
  if(contentSwitchFlag === true){
    console.log("movie")
    moviesSwitch.style.backgroundColor = "red"
    tvSwitch.style.backgroundColor = "black"
    fetchData()
  }else{
    console.log("tv-Show")
    tvSwitch.style.backgroundColor = "red"
    moviesSwitch.style.backgroundColor = "black"
    fetchData()
  }
}


tvSwitch.addEventListener("click",()=>{
  if (contentSwitchFlag === true){
    contentSwitchFlag = false;
    contentToRender();
  }
})

moviesSwitch.addEventListener("click",()=>{
  if (contentSwitchFlag === false){
    contentSwitchFlag = true;
    contentToRender();
  }
})


function loadMOviesTOContent(data){
  movieCardContainer.innerHTML=""
  console.log("this load function",data, typeof(data))
  const moviesArr = data.results
  moviesArr.forEach(ele => {
    console.log(ele)
    const movieCard = document.createElement('div')
    movieCard.setAttribute('class', 'movieCard')
    movieCard.innerHTML=(
  `<div class="movieDetails">
    <div class="titleRating">
      <p class="title">${contentSwitchFlag ? ele.title : ele.name}</p>
      <p class="rating"><i class="fa-solid fa-star fa-lg" style="color: #fab005;"></i>${ele.vote_average}</p>
    </div>
    <div>
      <h3>Plot Overview</h3>
      <p>${ele.overview}</p>
    </div>
  </div>
  <div class="cardImage">
    <img src="${IMAGE_BASE_API}${ele.poster_path}" alt="">
  </div>`)
  
  movieCardContainer.appendChild(movieCard)
    
  });
  // data.array.forEach(element => {
    
  // });

}


// const apiUrl =  'https://api.themoviedb.org/3/movie/movie_id/images'
//951491

async function fetchData() {
  let endpoint = ''
  if(contentSwitchFlag){
    endpoint = '/trending/movie/week'
  }
  else{
    endpoint = '/trending/tv/week'
  }
  
    // const apiUrl =  `${BASE_API}${endpoint}`;

    await axios.get(URL = `${BASE_API}${endpoint}`, {headers})
      .then(response => {
        const result = response.data
        console.log(result, typeof(result))
        console.log(URL)
        loadMOviesTOContent(response.data)
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // Call the fetchData function when the page loads
  
function onWindowLoad(){
  fetchGenere();
  contentToRender();
  }
  
  
  window.onload = onWindowLoad;



// https://api.themoviedb.org/3/genre/movie/list  -- This api gives the genere of the movies
// https://api.themoviedb.org/3/genre/tv/list     -- This api gives the genere of the Tv series
// https://api.themoviedb.org/3/trending/tv or movie/{timeZone} -- htis for trending movies and tv series
// <img src="https://image.tmdb.org/t/p/w500/{,jpg poster path}" alt=""></img>
// https://api.themoviedb.org/3/movie/movie_id/recommendations?language=en-US&page=1