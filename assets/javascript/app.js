//hike api key
//200432797-9adce9a5420c2e2c01a8fe63186f4f81
//loqate
//TC99-ZF99-RY89-DD72

$(document).ready(function () {
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

    
    var lat;
    var long;
    console.log(lat + "empty")

    $("#submit-button").on("click", function () {;

        var city = $("#cityData").val();
        console.log(city)

        //---Firebase---
        database.ref("/citySearch").push(city)



        //---Loqate---
        var queryURL2 = "https://api.addressy.com/Geocoding/International/Geocode/v1.10/json3.ws?Key=TC99-ZF99-RY89-DD72&Country=US&Location=" + city

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
        });
    });


    function renderTrails(latitude, longitude) {
        //change limit to 30 
        var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=30&maxResults=30&key=200432797-9adce9a5420c2e2c01a8fe63186f4f81"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //------change data to say items-----
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

})
