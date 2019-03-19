/*
Current Weather
*/

var city = "copenhagen";
var queryURL = "https://api.apixu.com/v1/current.json?key=4ff1ca255a1642e7a7e00340191903&q=" + city;

$.ajax({
    url: queryURL,
    method: "GET" 
}).then(function(response){
    console.log(response);
    /*Grab the weather icon and put it in the current weather div*/
    var weatherIcon = $("<img>");
    weatherIcon.attr("src", "https:" + response.current.condition.icon);
    $("#populate-weather").append(weatherIcon);
    /*Grab the accompanying text and put it in the current weather div*/
    var weatherIconText = $("<span>").append("  &nbsp;  &nbsp;  " + response.current.condition.text);
    $("#populate-weather").append(weatherIconText);
    /*Grab the current temp and display it in the weather div*/
    var currentTemp = $("<span>").append("  &nbsp;  &nbsp;  &nbsp; " + Math.round(response.current.temp_f) + "°F");
    $("#populate-weather").append(currentTemp);
})  

/*
Past Weather
*/

var date;
var lastYearsDate = "2017-01-01";
var city = "austin";
var queryURL = "https://api.apixu.com/v1/history.json?key=4ff1ca255a1642e7a7e00340191903&dt=" + lastYearsDate + "&q=" + city;

$.ajax({
    url: queryURL,
    method: "GET" 
}).then(function(response){
    console.log(response);
}) 

