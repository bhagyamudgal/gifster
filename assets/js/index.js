console.log("GIFSTER");

const api_key = "20C45pXFKbirnw9FkF1q2peLG8SIHh5Z";
let limit = 21;
let offset = 10;
let timeout = 2000;
// Display trending div
let displayTrending = (url) => {
  let trendingDiv = document.getElementById("trendingDiv");
  let img = `<img class="gif" src="${url}"style="background-color: pink;height: 10em;width: 10em;margin: 12px;" />`;

  trendingDiv.innerHTML += img;
};

// display load more div
let displayLoadmore = () => {
  let loadmore = `<h4 id="trendingLoadMore" style="cursor: pointer;margin-top: 10px;margin-left: 10px; margin-bottom: 25px; color:var(--bs-pink);" onclick="trendingLoadMore();">Load More &gt;</h4>`;
  let loadMoreDiv = document.getElementById("trendingLoadMoreDiv");
  loadMoreDiv.innerHTML = loadmore;
};

// display trendingloadmore div
function trendingLoadMore() {
  let loadMoreDiv = document.getElementById("trendingLoadMoreDiv");
  loadMoreDiv.innerHTML = "";
  limit = 28;
  offset += 30;
  document.getElementById("spinnerDiv").style.display = "flex";
  document.getElementById("spinner").style.display = "block";
  fetching(limit, offset, 4000);
}

// fetching api
let fetching = (limit, offset = 0, timeout = 2000) => {
  setTimeout(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=${limit}&rating=g&offset=${offset}`
    )
      .then((response) => response.text())
      .then((response) => {
        json = JSON.parse(response);
        //   console.log(json);
        jsonData = json.data;
        // console.log(jsonData);
        jsonData.forEach((element) => {
          // console.log(element.images.preview_gif.url);
          let url = element.images.preview_gif.url;
          displayTrending(url);
        });

        displayLoadmore();
        document.getElementById("footer").setAttribute("class", "footer-basic");
      });

    document.getElementById("spinnerDiv").style.display = "none";
    document.getElementById("spinner").style.display = "none";
  }, timeout);
};

fetching(limit, offset);

let searchBtn = document.getElementById("searchBtn");
let searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keypress", (e) => {
  if ("Enter" === e.key) {
    e.preventDefault();
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault;
  let inputValue = searchInput.value;
  localStorage.setItem("searchValueHome", inputValue);
  location.replace("/search.html");
});

