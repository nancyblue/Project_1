var city = "boston";
var loquateQueryURL = "https://api.addressy.com/Geocoding/International/Geocode/v1.10/json3.ws?Key=TC99-ZF99-RY89-DD72&Country=US&Location=" + city;
var lat;
var long;

$.ajax({
    url: loquateQueryURL,
    method: "GET" 
}).then(function(response){
    console.log(response);
    lat = response.Items[0].Latitude;
    long = response.Items[0].Longitude;
    console.log(lat);
    console.log(long);
    renderWeather();
}) 

var skycons = new Skycons({"color": "gray"});

function renderWeather () {
    
    var forecastQueryURL = "https://cors-ut-bootcamp.herokuapp.com/https://api.darksky.net/forecast/5a94f8eda59fbebfdab5d23ef8035ce8/" + lat + "," + long + "?exclude=minutely,hourly,alerts,flags";
    
    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var canvasAttr = {
            id: "icon1",
            width: "45px",
            height: "45px"
        }
        var icon = $("<canvas>").attr(canvasAttr);
        $("#populate-current-weather").append(icon);
        skycons.add("icon1", response.currently.icon);
        skycons.play();

        var temp = $("<span>").append("  &nbsp;  &nbsp;  " + Math.round(response.currently.temperature) + "°F");
        $("#populate-current-weather").append(temp);
        var currentSummary = $("<span>").append("  &nbsp;  &nbsp;  " + response.currently.summary + "<br>");
        $("#populate-current-weather").append(currentSummary);
        var dailySummary = $("<span>").append(response.daily.summary);
        $("#populate-current-weather").append(dailySummary);

    })

var pastDate = "2019-04-23"; //date the user enters
pastDate = moment().subtract(1, 'years').format('YYYY-MM-DDTHH:mm:ss');
console.log(pastDate);
var pastQueryURL = "https://cors-ut-bootcamp.herokuapp.com/https://api.darksky.net/forecast/5a94f8eda59fbebfdab5d23ef8035ce8/" + lat + "," + long + "," + pastDate + "?exclude=currently,minutely,hourly,alerts,flags";

    $.ajax({
        url: pastQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var canvasAttr = {
            id: "icon2",
            width: "45px",
            height: "45px"
        }
        var icon = $("<canvas>").attr(canvasAttr);
        $("#populate-past-weather").append(icon);
        skycons.add("icon2", response.daily.data[0].icon);
        skycons.play();

        var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  " + Math.round(response.daily.data[0].temperatureMax) + "°F");
        $("#populate-past-weather").append(maxTemp);
        var minTemp = $("<span>").append("  &nbsp;  &nbsp;  " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
        $("#populate-past-weather").append(minTemp);
        var dailySummary = $("<span>").append(response.daily.data[0].summary);
        $("#populate-past-weather").append(dailySummary);
    })

}

