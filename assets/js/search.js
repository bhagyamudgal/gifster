console.log("GIFSTER");

const api_key = "20C45pXFKbirnw9FkF1q2peLG8SIHh5Z";
let limit = 21;
let offset = 0;
let searchValueHome;
let timeout = 2000;
let searchValue;

let searchInput = document.getElementById("searchInput");
let searchTerm = document.getElementById("searchTerm");

searchInput.addEventListener("focus", () => {
  searchInput.value = "";
});
searchInput.addEventListener("keypress", (e) => {
  if ("Enter" === e.key) {
    e.preventDefault();
    searchBtn.click();
    searchInput.blur();
  }
});

if (localStorage.getItem("searchValueHome") !== null) {
  searchValueHome = localStorage.getItem("searchValueHome");
  // console.log(searchValueHome);
  let searchInput = document.getElementById("searchInput");
  searchInput.value = searchValueHome;
  searchTerm.setAttribute("class", "border rounded-0 border-dark");
  searchTerm.style.display = "inline";
  searchTerm.innerText = `${searchValueHome}`;
  document.getElementById("noResultsDiv").style.display = "none";
  fetchingSearch(limit, searchValueHome, offset, true);
  localStorage.clear();
  limit = 21;
  offset = 0;
} else {
  document.getElementById("spinnerDiv").style.display = "none";
  document.getElementById("spinner").style.display = "none";
}

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("noResultsDiv").style.display = "none";
  document.getElementById("spinnerDiv").style.display = "flex";
  document.getElementById("spinner").style.display = "block";
  let searchInput = document.getElementById("searchInput");
  searchValue = searchInput.value;
  let loadMoreDiv = document.getElementById("searchLoadMoreDiv");
  loadMoreDiv.innerHTML = "";
  searchTerm.setAttribute("class", "border rounded-0 border-dark");
  searchTerm.style.display = "inline";
  // console.log(searchTerm);

  searchTerm.innerText = `${searchValue}`;
  // console.log(searchValue);

  let searchDiv = document.getElementById("searchDiv");
  searchDiv.innerHTML = "";

  fetchingSearch(limit, searchValue, offset);
});

let displaySearch = (url) => {
  let searchDiv = document.getElementById("searchDiv");
  let img = `<img class="gif" src="${url}"style="background-color: pink;height: 10em;width: 10em;margin: 12px; " />`;

  searchDiv.innerHTML += img;
};

function displayLoadmoreSearchHome() {
  let loadmore = `<h4 id="searchLoadMore" style="cursor: pointer;margin-top: 10px;margin-left: 10px; margin-bottom: 25px; color:var(--bs-pink);" onclick="searchLoadMoreHome();">Load More &gt;</h4>`;
  let loadMoreDiv = document.getElementById("searchLoadMoreDiv");
  loadMoreDiv.innerHTML = loadmore;
}
function displayLoadmoreSearch() {
  let loadmore = `<h4 id="searchLoadMore" style="cursor: pointer;margin-top: 10px;margin-left: 10px; margin-bottom: 25px; color:var(--bs-pink);" onclick="searchLoadMore();">Load More &gt;</h4>`;
  let loadMoreDiv = document.getElementById("searchLoadMoreDiv");
  loadMoreDiv.innerHTML = loadmore;
}
function fetchingSearch(limit, query, offset = 0, bool, timeout = 2000) {
  setTimeout(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=${limit}&offset=${offset}&rating=g&lang=en`
    )
      .then((response) => response.text())
      .then((response) => {
        json = JSON.parse(response);
        //   console.log(json);
        jsonData = json.data;
        console.log(jsonData);
        if (jsonData.length != 0 && query != "") {
          jsonData.forEach((element) => {
            // console.log(element.images.preview_gif.url);
            let url = element.images.preview_gif.url;
            displaySearch(url);
          });

          if (bool === true) {
            displayLoadmoreSearchHome();
          } else {
            displayLoadmoreSearch();
          }
          
          // console.log(query);
        } else if (query == "") {
          let searchDiv = document.getElementById("searchDiv");
          searchDiv.innerHTML += `<div style="display:block; width:80%; margin: 180px auto"><center><h3>Search Field is empty. Search Something to get results.</h3></center></div>`;
         
        } else {
          let searchDiv = document.getElementById("searchDiv");
          searchDiv.innerHTML += `<div style="display:block; width:80%; margin: 180px auto"><center><h3>No results matching keyword. Search another keyword.</h3></center></div>`;
         
        }
      });

    document.getElementById("spinnerDiv").style.display = "none";
    document.getElementById("spinner").style.display = "none";
  }, 2000);
}

function searchLoadMoreHome() {
  let loadMoreDiv = document.getElementById("searchLoadMoreDiv");
  loadMoreDiv.innerHTML = "";
  limit = 28;
  offset += 30;
  document.getElementById("spinnerDiv").style.display = "flex";
  document.getElementById("spinner").style.display = "block";
  fetchingSearch(limit, searchValueHome, offset, true, 4000);
}
function searchLoadMore() {
  let loadMoreDiv = document.getElementById("searchLoadMoreDiv");
  loadMoreDiv.innerHTML = "";
  limit = 28;
  offset += 30;
  document.getElementById("spinnerDiv").style.display = "flex";
  document.getElementById("spinner").style.display = "block";
  fetchingSearch(limit, searchValue, offset, false, 4000);
}
