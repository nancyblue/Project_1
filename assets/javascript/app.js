//hike api key
//200432797-9adce9a5420c2e2c01a8fe63186f4f81
//loqate
//TC99-ZF99-RY89-DD72

$(document).ready(function () {

    $("#application-fill").hide();
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBDtXNSFpOSO9f2MUuhNeoqLkgVXy4m8jQ",
        authDomain: "project-1-326d1.firebaseapp.com",
        databaseURL: "https://project-1-326d1.firebaseio.com",
        projectId: "project-1-326d1",
        storageBucket: "project-1-326d1.appspot.com",
        messagingSenderId: "478932001495"
    };
    firebase.initializeApp(config);

    //create a variable to reference the database 
    var database = firebase.database();
    var inputs = 0;


    var lat;
    var long;

    $("#submit-button").on("click", function () {
        $("#application-fill").show();
        $("#bg-fill").hide();
        //prevents page from refreshing
        // event.preventDefault();

        var city = $("#cityData").val();
        console.log(city);
      
        //---Firebase---
        database.ref("/citySearch").push(city)
        inputs++;

        //---Loqate---
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
            renderBikes(lat, long);
            renderWeather(lat, long);
            
        });
    });

    //This will add the city to our webpage
    database.ref("/citySearch").on("child_added", function(childSnapshot){
        console.log(childSnapshot.val());
        var cityName = childSnapshot.val().city;
        console.log(cityName);
        var cityDiv = $("<div class='recentCities'>");
        var cityText = $("<p>").text(cityName);
        cityDiv.append(cityText);
        //this is where we will append it to the specified div in the html 
    });

    function renderTrails(latitude, longitude) {
        //change limit to 30 
        var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=30&maxResults=30&key=200432797-9adce9a5420c2e2c01a8fe63186f4f81";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //------change data to say items-----
            var results = response.trails;
            //for loop
            for (var i = 0; i < results.length; i++) {
                //take the information from the aray (30)
                //for each item make a div
                var trailDiv = $("<div class='trailDiv'></div>");
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

                trailDiv.append(image, p1, p2, p6, p3, p4, p5);

                $("#populateHikes").append(trailDiv);
            }

        });
    }

    function renderBikes(latitude, longitude) {

        // api key : 200433687-089c275b485af4ffdbd3dd1efd4536fc
        // https://www.mtbproject.com/data

        var queryURL3 = "https://www.mtbproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=10&key=200433687-089c275b485af4ffdbd3dd1efd4536fc";

        $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function (response2) {
            console.log(response2);
            var results = response2.trails;
            for (var i = 0; i < results.length; i++) {

                var bikeDiv = $("<div class='bikeDiv'></div>");
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

                bikeDiv.append(image, p1, p2, p6, p3, p4, p5);
                
                $("#populateBikes").append(bikeDiv);
            }
        })
    }
})
    
var skycons = new Skycons({"color": "gray"});

function renderWeather () {
    
    var currentQueryURL = "https://cors-ut-bootcamp.herokuapp.com/https://api.darksky.net/forecast/5a94f8eda59fbebfdab5d23ef8035ce8/" + latitude + "," + longitude + "?exclude=minutely,hourly,alerts,flags";
    
    $.ajax({
        url: currentQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var canvasAttr = {
            id: "icon0",
            width: "45px",
            height: "45px"
        }
        var icon = $("<canvas>").attr(canvasAttr);
        $("#populate-current-weather").append(icon);
        skycons.add("icon0", response.currently.icon);
        skycons.play();

        var temp = $("<span>").append("  &nbsp;  &nbsp;  " + Math.round(response.currently.temperature) + "°F");
        $("#populate-current-weather").append(temp);
        var currentSummary = $("<span>").append("  &nbsp;  &nbsp;  " + response.currently.summary + "<br>");
        $("#populate-current-weather").append(currentSummary);
    })

    //DAY 1
    // var startDate = "2019-12-23";
    var startDate = $("#startDateData").val(); //date the user enters
    console.log(startDate); 
    var dateFormat = "YYYY-MM-DD";
    var day1 = moment(startDate, dateFormat).subtract(2, 'years').format('YYYY-MM-DDTHH:mm:ss');
    console.log(day1);
    var futureQueryURL1 = "https://cors-ut-bootcamp.herokuapp.com/https://api.darksky.net/forecast/5a94f8eda59fbebfdab5d23ef8035ce8/" + latitude + "," + longitude + "," + day1;


        $.ajax({
            url: futureQueryURL1,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var day1Converted = moment(startDate, dateFormat).format('MMM Do');
            $("#populate-future-weather-1").prepend(day1Converted + "<br>");

            var canvasAttr = {
                id: "icon1",
                width: "45px",
                height: "45px"
            }
            var icon = $("<canvas>").attr(canvasAttr);
            $("#populate-future-weather-1").append(icon);
            skycons.add("icon1", response.daily.data[0].icon);
            skycons.play();

            var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
            $("#populate-future-weather-1").append(maxTemp);
            var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
            $("#populate-future-weather-1").append(minTemp);
            var dailySummary = $("<span>").append(response.daily.data[0].summary);
            $("#populate-future-weather-1").append(dailySummary);
        })

    //DAY 2

    var day2 = moment(startDate, dateFormat).subtract(2, 'years').add(1, 'days').format('YYYY-MM-DDTHH:mm:ss');
    console.log(day2);
    var futureQueryURL2 = "https://cors-ut-bootcamp.herokuapp.com/https://api.darksky.net/forecast/5a94f8eda59fbebfdab5d23ef8035ce8/" + latitude + "," + longitude + "," + day2;

        $.ajax({
            url: futureQueryURL2,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var day2Converted = moment(startDate, dateFormat).add(1, 'days').format('MMM Do');
            $("#populate-future-weather-2").prepend(day2Converted + "<br>");

            var canvasAttr = {
                id: "icon2",
                width: "45px",
                height: "45px"
            }
            var icon = $("<canvas>").attr(canvasAttr);
            $("#populate-future-weather-2").append(icon);
            skycons.add("icon2", response.daily.data[0].icon);
            skycons.play();

            var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
            $("#populate-future-weather-2").append(maxTemp);
            var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
            $("#populate-future-weather-2").append(minTemp);
            var dailySummary = $("<span>").append(response.daily.data[0].summary);
            $("#populate-future-weather-2").append(dailySummary);
        })

    //DAY 3

    var day3 = moment(startDate, dateFormat).subtract(2, 'years').add(2, 'days').format('YYYY-MM-DDTHH:mm:ss');
    console.log(day3);
    var futureQueryURL3 = "https://cors-ut-bootcamp.herokuapp.com/https://api.darksky.net/forecast/5a94f8eda59fbebfdab5d23ef8035ce8/" + latitude + "," + longitude + "," + day3;

        $.ajax({
            url: futureQueryURL3,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var day3Converted = moment(startDate, dateFormat).add(2, 'days').format('MMM Do');
            $("#populate-future-weather-3").prepend(day3Converted + "<br>");

            var canvasAttr = {
                id: "icon3",
                width: "45px",
                height: "45px"
            }
            var icon = $("<canvas>").attr(canvasAttr);
            $("#populate-future-weather-3").append(icon);
            skycons.add("icon3", response.daily.data[0].icon);
            skycons.play();

            var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
            $("#populate-future-weather-3").append(maxTemp);
            var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
            $("#populate-future-weather-3").append(minTemp);
            var dailySummary = $("<span>").append(response.daily.data[0].summary);
            $("#populate-future-weather-3").append(dailySummary);
        })

    //DAY 4

    var day4 = moment(startDate, dateFormat).subtract(2, 'years').add(3, 'days').format('YYYY-MM-DDTHH:mm:ss');
    console.log(day4);
    var futureQueryURL4 = "https://cors-ut-bootcamp.herokuapp.com/https://api.darksky.net/forecast/5a94f8eda59fbebfdab5d23ef8035ce8/" + latitude + "," + longitude + "," + day4;

        $.ajax({
            url: futureQueryURL4,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var day4Converted = moment(startDate, dateFormat).add(3, 'days').format('MMM Do');
            $("#populate-future-weather-4").prepend(day4Converted + "<br>");

            var canvasAttr = {
                id: "icon4",
                width: "45px",
                height: "45px"
            }
            var icon = $("<canvas>").attr(canvasAttr);
            $("#populate-future-weather-4").append(icon);
            skycons.add("icon4", response.daily.data[0].icon);
            skycons.play();

            var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
            $("#populate-future-weather-4").append(maxTemp);
            var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
            $("#populate-future-weather-4").append(minTemp);
            var dailySummary = $("<span>").append(response.daily.data[0].summary);
            $("#populate-future-weather-4").append(dailySummary);
        })

    //DAY 5

    var day5 = moment(startDate, dateFormat).subtract(2, 'years').add(4, 'days').format('YYYY-MM-DDTHH:mm:ss');
    console.log(day5);
    var futureQueryURL5 = "https://cors-ut-bootcamp.herokuapp.com/https://api.darksky.net/forecast/5a94f8eda59fbebfdab5d23ef8035ce8/" + latitude + "," + longitude + "," + day5;

        $.ajax({
            url: futureQueryURL5,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var day5Converted = moment(startDate, dateFormat).add(4, 'days').format('MMM Do');
            $("#populate-future-weather-5").prepend(day5Converted + "<br>");

            var canvasAttr = {
                id: "icon5",
                width: "45px",
                height: "45px"
            }
            var icon = $("<canvas>").attr(canvasAttr);
            $("#populate-future-weather-5").append(icon);
            skycons.add("icon5", response.daily.data[0].icon);
            skycons.play();

            var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
            $("#populate-future-weather-5").append(maxTemp);
            var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
            $("#populate-future-weather-5").append(minTemp);
            var dailySummary = $("<span>").append(response.daily.data[0].summary);
            $("#populate-future-weather-5").append(dailySummary);
        })

    //DAY 6

    var day6 = moment(startDate, dateFormat).subtract(2, 'years').add(5, 'days').format('YYYY-MM-DDTHH:mm:ss');
    console.log(day6);
    var futureQueryURL6 = "https://cors-ut-bootcamp.herokuapp.com/https://api.darksky.net/forecast/5a94f8eda59fbebfdab5d23ef8035ce8/" + latitude + "," + longitude + "," + day6;

        $.ajax({
            url: futureQueryURL6,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var day6Converted = moment(startDate, dateFormat).add(5, 'days').format('MMM Do');
            $("#populate-future-weather-6").prepend(day6Converted + "<br>");

            var canvasAttr = {
                id: "icon6",
                width: "45px",
                height: "45px"
            }
            var icon = $("<canvas>").attr(canvasAttr);
            $("#populate-future-weather-6").append(icon);
            skycons.add("icon6", response.daily.data[0].icon);
            skycons.play();

            var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
            $("#populate-future-weather-6").append(maxTemp);
            var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
            $("#populate-future-weather-6").append(minTemp);
            var dailySummary = $("<span>").append(response.daily.data[0].summary);
            $("#populate-future-weather-6").append(dailySummary);
        })

    //DAY 7

    var day7 = moment(startDate, dateFormat).subtract(2, 'years').add(6, 'days').format('YYYY-MM-DDTHH:mm:ss');
    console.log(day7);
    var futureQueryURL7 = "https://cors-ut-bootcamp.herokuapp.com/https://api.darksky.net/forecast/5a94f8eda59fbebfdab5d23ef8035ce8/" + latitude + "," + longitude + "," + day7;

        $.ajax({
            url: futureQueryURL7,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var day7Converted = moment(startDate, dateFormat).add(6, 'days').format('MMM Do');
            $("#populate-future-weather-7").prepend(day7Converted + "<br>");

            var canvasAttr = {
                id: "icon7",
                width: "45px",
                height: "45px"
            }
            var icon = $("<canvas>").attr(canvasAttr);
            $("#populate-future-weather-7").append(icon);
            skycons.add("icon7", response.daily.data[0].icon);
            skycons.play();

            var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
            $("#populate-future-weather-7").append(maxTemp);
            var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
            $("#populate-future-weather-7").append(minTemp);
            var dailySummary = $("<span>").append(response.daily.data[0].summary);
            $("#populate-future-weather-7").append(dailySummary);
        })

    }


