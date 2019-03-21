//hike api key
//200432797-9adce9a5420c2e2c01a8fe63186f4f81
//loqate
//TC99-ZF99-RY89-DD72
$(document).ready(function () {
    // $("#application-fill").hide();
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
        // $("#application-fill").show();
        // $("#bg-fill").hide();
        //prevents page from refreshing
        // event.preventDefault();
        var city = $("#cityData").val();
        console.log(city);

        //---Firebase---
        database.ref("/citySearch").push(city)
        inputs++;
        //---Loqate---
        var queryURL2 = "https://api.addressy.com/Geocoding/International/Geocode/v1.10/json3.ws?Key=EZ39-WY68-HG79-NB67&Country=US&Location=" + city;
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
        var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=30&maxResults=10&key=200432797-9adce9a5420c2e2c01a8fe63186f4f81";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.trails;
              //for loop
              for (var i = 0; i < results.length; i++) {
                //take the information from the aray (30)
                //for each item make a div
                var trailDiv = $("<div class='trailDiv'></div>");
                //trail name
                var p1 = $("<p>").html("<span id='descriptionHeader'>Trail Name: </span>" + results[i].name);
                //location
                var p2 = $("<p>").html("<span id='descriptionHeader'>Location: </span>" + results[i].location);
                //difficulty
                var p3 = $("<p>").html("<span id='descriptionHeader'>Difficulty: </span>" + results[i].difficulty);
                //condition details
                var p4 = $("<p>").html("<span id='descriptionHeader'>Trail Condition: </span>" + results[i].conditionDetails);
                //ascent
                var p5 = $("<p>").html("<span id='descriptionHeader'>Ascent(feet): </span>" + results[i].ascent);
                //length
                var p6 = $("<p>").html("<span id='descriptionHeader'>Length(miles): </span>" + results[i].length);
                //img small
                var image = $("<img>").attr("src", results[i].imgSmall);
                trailDiv.append(image, p1, p2, p6, p3, p4, p5);
                $("#hikingTarget").append(trailDiv);
            }

            var trailArray = [];
            var trailDescent = [];
            var trailAscent = [];

            //for loop to push our trail names to an array
            for (var i = 0; i < results.length; i++){
                trailArray.push(results[i].name);
            }
            //for loop to push our trail length to an array
            for (var i = 0; i < results.length; i++){
                trailDescent.push(Math.abs(results[i].descent));
            }
            //for loop to push our trail ascent to an array
            for (var i = 0; i < results.length; i++){
                trailAscent.push(results[i].ascent);
            }

            //chart.js
            var trailchart = document.getElementById("hikingCanvas").getContext("2d");

            var chart1 = new Chart(trailchart, {
                type: "line",
                data: {
                    labels: trailArray,
                    datasets:[{
                        label: "Descent",
                        borderColor: "red",
                        backgroundColor: "red",
                        data: trailDescent,

                        },
                        {
                        label: "Ascent",
                        borderColor: "orange",
                        backgroundColor: "orange",
                        data: trailAscent,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: "Ascent and Descent"
                    },
                    tooltips: {
                        mode: 'index',
                    },
                    hover: {
                        mode: 'index'
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Trail Name"
                            }
                        }],
                        yAxes: [{
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Feet"
                            }
                        }]
                    }
                }
            });

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
                var p1 = $("<p>").html("<span id='descriptionHeader'>Trail Name: </span>" + results[i].name);
                //location
                var p2 = $("<p>").html("<span id='descriptionHeader'>Location: </span>" + results[i].location);
                //difficulty
                var p3 = $("<p>").html("<span id='descriptionHeader'>Difficulty: </span>" + results[i].difficulty);
                //condition details
                var p4 = $("<p>").html("<span id='descriptionHeader'>Trail Condition: </span>" + results[i].conditionDetails);
                //ascent
                var p5 = $("<p>").html("<span id='descriptionHeader'>Ascent(Feet): </span>" + results[i].ascent);
                //length
                var p6 = $("<p>").html("<span id='descriptionHeader'>Length(Miles): </span>" + results[i].length);
                //img small
                var image = $("<img>").attr("src", results[i].imgSmall);
                bikeDiv.append(image, p1, p2, p6, p3, p4, p5);

                $("#bikingTarget").append(bikeDiv);
            }
        })
    }
// *************************************************** Polar Chart *************************************************************************************
        var difficultyArray = [];

           //for loop to push our trail difficulty to an array
           for (var i = 0; i < results.length; i++){
               myArray.push(results[i].difficulty)
           }
           var difficultyData = [];

           //for loop to push our difficulty data to an array
           for (var i = 0; i < results.length; i++){
               difficultyData.push(results[i].difficulty)
           } 
               <canvas id="myChart2"></canvas>
                var ctx = document.getElementById('myChart2').getContext('2d');
                var Chart = new Chart(ctx, {
                    // The type of chart we want to create
                    type: 'polarArea',

                    // The data for our dataset
                    data: {
                        // trailArray is an empty array being populated by our Trail API, so it stores the trail names
                        labels: [trailArray],
                        datasets: [{
                            label: 'My First dataset',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: difficultyData
                        }]
                    },

                    // Configuration options go here
                    options: {
                        
                    }
                });

// *************************************************** Polar Chart *************************************************************************************


    var skycons = new Skycons({"color": "lightblue"});

    function renderWeather (latitude, longitude) {
        
        var currentQueryURL = "https://cors-ut-bootcamp.herokuapp.com/https://api.darksky.net/forecast/5a94f8eda59fbebfdab5d23ef8035ce8/" + latitude + "," + longitude + "?exclude=minutely,hourly,alerts,flags";
        
        $.ajax({
            url: currentQueryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var weather0 = $("<div id= 'populate-current-weather'></div>");
            $("#weatherTarget").append(weather0);

            var canvasAttr = {
                id: "icon0",
                width: "45px",
                height: "45px"
            }
            var icon = $("<canvas>").attr(canvasAttr);

            var temp = $("<span>").append("  &nbsp;  &nbsp;  " + Math.round(response.currently.temperature) + "°F");
            var currentSummary = $("<span>").append("  &nbsp;  &nbsp;  " + response.currently.summary + "<br>");
            
            $("#populate-current-weather").prepend(icon).append(temp).append(currentSummary);
            skycons.add("icon0", response.currently.icon);
            skycons.play();

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

                var weather1 = $("<div id= 'populate-future-weather-1'></div>");
                $("#weatherTarget").append(weather1);

                var day1Converted = moment(startDate, dateFormat).format('MMM Do');
                $("#populate-future-weather-1").prepend(day1Converted + "<br>");

                var canvasAttr = {
                    id: "icon1",
                    width: "45px",
                    height: "45px"
                }
                var icon = $("<canvas>").attr(canvasAttr);
                
                var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
                var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
                var dailySummary = $("<span>").append(response.daily.data[0].summary);

                $("#populate-future-weather-1").append(icon).append(maxTemp).append(minTemp).append(dailySummary);
                skycons.add("icon1", response.daily.data[0].icon);
                skycons.play();
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

                var weather2 = $("<div id= 'populate-future-weather-2'></div>");
                $("#weatherTarget").append(weather2);

                var day2Converted = moment(startDate, dateFormat).add(1, 'days').format('MMM Do');
                $("#populate-future-weather-2").prepend(day2Converted + "<br>");

                var canvasAttr = {
                    id: "icon2",
                    width: "45px",
                    height: "45px"
                }
                var icon = $("<canvas>").attr(canvasAttr);

                var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
                var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
                var dailySummary = $("<span>").append(response.daily.data[0].summary);

                $("#populate-future-weather-2").append(icon).append(maxTemp).append(minTemp).append(dailySummary);
                skycons.add("icon2", response.daily.data[0].icon);
                skycons.play();
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

                var weather3 = $("<div id= 'populate-future-weather-3'></div>");
                $("#weatherTarget").append(weather3);

                var day3Converted = moment(startDate, dateFormat).add(2, 'days').format('MMM Do');
                $("#populate-future-weather-3").prepend(day3Converted + "<br>");

                var canvasAttr = {
                    id: "icon3",
                    width: "45px",
                    height: "45px"
                }
                var icon = $("<canvas>").attr(canvasAttr);

                var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
                var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
                var dailySummary = $("<span>").append(response.daily.data[0].summary);

                $("#populate-future-weather-3").append(icon).append(maxTemp).append(minTemp).append(dailySummary);
                skycons.add("icon3", response.daily.data[0].icon);
                skycons.play();
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

                var weather4 = $("<div id= 'populate-future-weather-4'></div>");
                $("#weatherTarget").append(weather4);

                var day4Converted = moment(startDate, dateFormat).add(3, 'days').format('MMM Do');
                $("#populate-future-weather-4").prepend(day4Converted + "<br>");

                var canvasAttr = {
                    id: "icon4",
                    width: "45px",
                    height: "45px"
                }
                var icon = $("<canvas>").attr(canvasAttr);

                var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
                var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
                var dailySummary = $("<span>").append(response.daily.data[0].summary);

                $("#populate-future-weather-4").append(icon).append(maxTemp).append(minTemp).append(dailySummary);
                skycons.add("icon4", response.daily.data[0].icon);
                skycons.play();
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

                var weather5 = $("<div id= 'populate-future-weather-5'></div>");
                $("#weatherTarget").append(weather5);

                var day5Converted = moment(startDate, dateFormat).add(4, 'days').format('MMM Do');
                $("#populate-future-weather-5").prepend(day5Converted + "<br>");

                var canvasAttr = {
                    id: "icon5",
                    width: "45px",
                    height: "45px"
                }
                var icon = $("<canvas>").attr(canvasAttr);

                var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
                var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
                var dailySummary = $("<span>").append(response.daily.data[0].summary);

                $("#populate-future-weather-5").append(icon).append(maxTemp).append(minTemp).append(dailySummary);
                skycons.add("icon5", response.daily.data[0].icon);
                skycons.play();
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

                var weather6 = $("<div id= 'populate-future-weather-6'></div>");
                $("#weatherTarget").append(weather6);

                var day6Converted = moment(startDate, dateFormat).add(5, 'days').format('MMM Do');
                $("#populate-future-weather-6").prepend(day6Converted + "<br>");

                var canvasAttr = {
                    id: "icon6",
                    width: "45px",
                    height: "45px"
                }
                var icon = $("<canvas>").attr(canvasAttr);

                var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
                var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
                var dailySummary = $("<span>").append(response.daily.data[0].summary);

                $("#populate-future-weather-6").append(icon).append(maxTemp).append(minTemp).append(dailySummary);
                skycons.add("icon6", response.daily.data[0].icon);
                skycons.play();
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

                var weather7 = $("<div id= 'populate-future-weather-7'></div>");
                $("#weatherTarget").append(weather7);

                var day7Converted = moment(startDate, dateFormat).add(6, 'days').format('MMM Do');
                $("#populate-future-weather-7").prepend(day7Converted + "<br>");

                var canvasAttr = {
                    id: "icon7",
                    width: "45px",
                    height: "45px"
                }
                var icon = $("<canvas>").attr(canvasAttr);

                var maxTemp = $("<span>").append("  &nbsp;  &nbsp;  High: " + Math.round(response.daily.data[0].temperatureMax) + "°F");
                var minTemp = $("<span>").append("  &nbsp;  &nbsp;  Low: " + Math.round(response.daily.data[0].temperatureMin) + "°F <br>");
                var dailySummary = $("<span>").append(response.daily.data[0].summary);

                $("#populate-future-weather-7").append(icon).append(maxTemp).append(minTemp).append(dailySummary);
                skycons.add("icon7", response.daily.data[0].icon);
                skycons.play();
            })

        }

    })
