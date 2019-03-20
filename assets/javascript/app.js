//hike api key
//200432797-9adce9a5420c2e2c01a8fe63186f4f81
//loqate
//TC99-ZF99-RY89-DD72

$(document).ready(function () {
    // debugger;

    var lat;
    var long;
    // console.log(lat + "empty");

    // $("#submit-button").on("click", function () {
        // debugger;

        // var city = $("#cityData").val();
        var city = "boston";
        console.log(city);
        var queryURL2 = "https://api.addressy.com/Geocoding/International/Geocode/v1.10/json3.ws?Key=TC99-ZF99-RY89-DD72&Country=US&Location=" + city;

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response1) {
            console.log(response1);

            lat = response1.Items[0].Latitude;
            long = response1.Items[0].Longitude;
            console.log("lat is" + lat);
            console.log("long is" + long);
            renderTrails(lat, long);
            renderWeather(lat, long);
        });
    });


    function renderTrails(latitude, longitude) {
        //change limit to 30 
        var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=30&maxResults=30&key=200432797-9adce9a5420c2e2c01a8fe63186f4f81";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            //for loop
            for (var i = 0; i < results.length; i++) {
                //take the information from the aray (30)
                //for each item make a div
                var trailDiv = $("<div class='trailDiv>'");
                //trail name
                var p1 = $("<p>").text("Trail Name: " + results[i].name);
                //location
                var p2 = $("<p>").text("Location: " + results[i].location);
                //difficulty 
                var p3 = $("<p>").text("Difficulty: " + results[i].difficulty);
                //condition details 
                var p4 = $("<p>").text("Trail Condition: " + results[i].conditionDetails);
                //ascent 
                var p5 = $("<p>").text("Ascent (Feet): " + results[i].ascent);
                //length
                var p6 = $("<p>").text("Length (Miles): " + results[i].length);
                //img small
                var image = $("<img>").attr("src", results[i].imgSmall);

                trailDiv.append(p1, p2, p3, p4, p5, p6, image);

                $("#populate-hike").append(trailDiv);

            }


        });
    }
    

    // renderTrails(lat, long);




var skycons = new Skycons({"color": "gray"});

function renderWeather (latitude, longitude) {
    
    var forecastQueryURL = "https://cors-ut-bootcamp.herokuapp.com/https://api.darksky.net/forecast/5a94f8eda59fbebfdab5d23ef8035ce8/" + latitude + "," + longitude + "?exclude=minutely,hourly,alerts,flags";
    
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
    })

// var someDate = "2019-04-23"; //date the user enters
// var someFormat = "YYYY-MM-DD";
// var pastDate = moment(someDate, someFormat).subtract(1, 'years').format('YYYY-MM-DDTHH:mm:ss');
// console.log(pastDate);
var futureDate = "2019-08-20T12:00:00"
var futureQueryURL = "https://cors-ut-bootcamp.herokuapp.com/https://api.darksky.net/forecast/5a94f8eda59fbebfdab5d23ef8035ce8/" + latitude + "," + longitude + "," + pastDate;
// + "?exclude=currently,minutely,hourly,alerts,flags";

    $.ajax({
        url: futureQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var canvasAttr = {
            id: "icon2",
            width: "45px",
            height: "45px"
        }
        var icon = $("<canvas>").attr(canvasAttr);
        $("#populate-future-weather").append(icon);
        skycons.add("icon2", response.daily.data[0].icon);
        skycons.play();

        var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  " + Math.round(response.daily.data[0].temperatureMax) + "°F");
        $("#populate-future-weather").append(maxTemp);
        var minTemp = $("<span>").append("  &nbsp;  &nbsp;  " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
        $("#populate-future-weather").append(minTemp);
        var dailySummary = $("<span>").append(response.daily.data[0].summary);
        $("#populate-future-weather").append(dailySummary);
    })

}
// })