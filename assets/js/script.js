const searchBarEL = document.querySelector('.search-bar');


const weather = {
  apiKey: "368c68e48199376ea0124e4ba45fa317",
  fetchOpenWeather(city) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayCityWeather(data))
      .catch((error) => console.log(error, "Unable to connect to API"));
  },
  displayCityWeather(data) {
    const { name } = data; //get it ouf the json data
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind; //get it out of the json data

    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".current-city").textContent =
      "The weather for: " + name;
    document.querySelector(".current-weather-description").textContent =
      description;
    document.querySelector(".current-weather-icon").src =
      "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".current-temp").textContent =
      "Temp:  " + temp + "°F";
    document.querySelector(".current-humidity").textContent =
      "Humidity:  " + humidity + "%";
    document.querySelector(".current-wind").textContent =
      "Wind speed:  " + speed + "mph";
  },
  search() { //search function
    this.fetchOpenWeather(searchBarEL.value);

  }
};
document
  .querySelector(".search button")
  .addEventListener("click", () => {
    weather.search();
    localStorage.setItem("city", searchBarEL.value);
    //forevery search add a new li into the history-ul list with the city name
    const historyUl = document.querySelector(".history-ul");
    const li = document.createElement("li");
    li.textContent = searchBarEL.value;
    historyUl.appendChild(li);
    //add a click event to the li
    li.addEventListener("click", () => {
      weather.fetchOpenWeather(li.textContent);
    }
    );
  });

  searchBarEL.addEventListener("keyup", (event) => {
    event.preventDefault();
  if (event.key == "Enter" && searchBarEL.value != "") {
    searchBarEL.value.trim();
    weather.search();

    localStorage.setItem("city", searchBarEL.value);
    //forevery search add a new li into the history-ul list with the city name
    const historyUl = document.querySelector(".history-ul");
    const li = document.createElement("li");
    li.textContent = searchBarEL.value;
    historyUl.appendChild(li);
    //add a click event to the li
    li.addEventListener("click", () => {
      weather.fetchOpenWeather(li.textContent);
    }
    );
    searchBarEL.value = "";
  }
  }
);


weather.fetchOpenWeather("New York");

//`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
