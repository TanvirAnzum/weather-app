let form = document.querySelector(".main__wrapper__form");
let wrapper = document.querySelector(".main__wrapper");
let outcome = document.querySelector(".main__outcome");
let city = document.querySelector("#city");
let btn = document.querySelector(".btn");
let temp = document.querySelector(".temp");
let desc = document.querySelector(".condition");
let loc = document.querySelector(".location");
let img = document.querySelector(".img");
let fl = document.querySelector(".feels_like");
let humidity = document.querySelector(".humidity");
let arrow = document.querySelector(".arrow");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = city.value;

  wrapper.style.display = "none";
  outcome.style.display = "flex";

  let u = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=13daf73b2f6ed5f5381d5fcaa97a5016&units=metric`;
  fetch(u)
    .then((r) => r.json())
    .then((d) => {
      console.log(d);
      if (d.cod == "404" && d.message == "city not found") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid input field!",
          footer: '<a href="./index.html">Back to front page!</a>',
        });
      }
      temp.textContent = d.main.temp + "°C";
      desc.textContent = d.weather[0].description;
      fl.textContent = d.main.feels_like + "°C";
      humidity.textContent = d.main.humidity;
      loc.textContent = d.name + ", " + d.sys.country;
      setimg(d.weather[0].id);
    });
});

btn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    Swal.fire("Opps!! Your browser doesn't support location.");
  }
});

function success(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  wrapper.style.display = "none";
  outcome.style.display = "flex";

  let u = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=13daf73b2f6ed5f5381d5fcaa97a5016&units=metric`;
  fetch(u)
    .then((r) => r.json())
    .then((d) => {
      console.log(d);
      temp.textContent = d.main.temp + "°C";
      desc.textContent = d.weather[0].description;
      fl.textContent = d.main.feels_like + "°C";
      humidity.textContent = d.main.humidity;
      loc.textContent = d.name + ", " + d.sys.country;
      setimg(d.weather[0].id);
    });
}

function error() {
  Swal.fire("Opps!! Please Enable Your Location.");
}

function escape(str) {
  let output = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] == " " || str[i] == ".") continue;
    output += str[i];
  }
  return output;
}

arrow.addEventListener("click", () => {
  location.reload();
});

function setimg(x) {
  if (x == 800) {
    img.src = "./svg/clear.svg";
  } else if (x >= 200 && x <= 232) {
    img.src = "./svg/storm.svg";
  } else if (x >= 600 && x <= 622) {
    img.src = "./svg/snow.svg";
  } else if (x >= 701 && x <= 781) {
    img.src = "./svg/haze.svg";
  } else if (x >= 801 && x <= 804) {
    img.src = "./svg/cloud.svg";
  } else if ((x >= 500 && x <= 531) || (x >= 300 && x <= 321)) {
    img.src = "./svg/rain.svg";
  }
}
