let form = document.querySelector(".main__wrapper__form");
let btn = document.querySelector(".btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("pressed");
});

btn.addEventListener("click", () => {
  if (navigator.geolocation) {
    console.log(navigator.geolocation.getCurrentPosition(showPosition));
  } else console.log("error");
});

function showPosition(position) {
  let x;
  x =
    "Latitude: " +
    position.coords.latitude +
    " Longitude: " +
    position.coords.longitude;
  console.log(x);
}
