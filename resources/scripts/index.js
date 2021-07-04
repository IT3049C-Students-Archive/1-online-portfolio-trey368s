function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

    console.log("latitude:" + latitude);
    console.log("longitude:" + longitude);

    fetch('https://api.weather.gov/points/' + latitude + "," + longitude)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.properties.relativeLocation.properties.city);
        const city = data.properties.relativeLocation.properties.city;
        document.getElementById("city").innerHTML = "City: " + city;
      })
    fetch('https://api.weather.gov/points/' + latitude + "," + longitude)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const forecastURL = data.properties.forecastHourly;
        fetch(forecastURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data.properties.periods[0].temperature)
            const temperature = data.properties.periods[0].temperature;
            document.getElementById("temperature").innerHTML = "Temperature: " + temperature + "°F";
          })
        fetch(forecastURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data.properties.periods[0].shortForecast)
            const shortForecast = data.properties.periods[0].shortForecast;
            document.getElementById("weather").innerHTML = "Weather: " + shortForecast;
          })
      })
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.querySelector('#find-me').addEventListener('click', geoFindMe);

