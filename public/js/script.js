const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const weatherParagraph = document.getElementById("weather");
const errorParagraph = document.getElementById("error");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value;
  // clear paragraphs before the next search
  weatherParagraph.textContent = "Getting weather...";
  errorParagraph.textContent = "";

  if (!city) {
    weatherParagraph.textContent = "";
    errorParagraph.textContent = "Please, type your city";
  } else {
    fetch(`http://localhost:3000/weather?search=${city}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          weatherParagraph.textContent = "";
          errorParagraph.textContent = data.error;
        } else {
          weatherParagraph.textContent = data.data;
        }
      });
    });
  }
});
