const button = document.getElementById("searchBtn");
const input = document.getElementById("movieInput");

const poster = document.getElementById("poster");
const title = document.getElementById("title");
const year = document.getElementById("year");
const rating = document.getElementById("rating");
const genre = document.getElementById("genre");
const plot = document.getElementById("plot");

const apiKey = "8b6390e9";

button.addEventListener("click", () => {
  let movieName = input.value.trim();
  if (movieName === "") {
    alert("Please Enter Movie Name");

    return;
  }
  getMovie(movieName);
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    let movieName = input.value.trim();
    if (movieName === "") {
      alert("Please Enter Movie Name");

      return;
    }
    getMovie(movieName);
  }
});
const getMovie = async (movieName) => {
  try {
    let url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`;
    let response = await fetch(url);
    let data = await response.json();
    if (data.Response === "False") {
      alert("Movie Not Found");
      return;
    }

    title.innerHTML = data.Title;
    year.innerHTML = "Release Year : " + data.Year;
    rating.innerHTML = "⭐ " + data.imdbRating;
    genre.innerHTML = "Genre : " + data.Genre;

    plot.innerHTML = data.Plot;
    if (data.Poster === "N/A") {
      poster.src = "images/no-image.png";
    } else {
      poster.src = data.Poster;
    }
    input.value = "";

    input.focus();
  } catch (error) {
    alert("Something Went Wrong");
  }
};
