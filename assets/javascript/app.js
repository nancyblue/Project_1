//200432797-9adce9a5420c2e2c01a8fe63186f4f81

//loqate 
//TC99-ZF99-RY89-DD72

$(document).ready(function(){

    var queryURL2 = "https://api.addressy.com/Geocoding/International/Geocode/v1.10/json3.ws?Key=TC99-ZF99-RY89-DD72&Country=US&Location=Chicago"
    // lat = latitude 
    // long = longitude
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=30.267&lon=-97.7431&maxDistance=30&key=200432797-9adce9a5420c2e2c01a8fe63186f4f81"

    // $.ajax({
    //     url : queryURL2,
    //     method: "GET"
    // }).then(function(response1){
    //     console.log(response1)
    //     //set the lat = response.items[0].latitude
    //     //set long = response.item[0].longitude
    // });

    $.ajax({
        url : queryURL,
        method: "GET"
    }).then(function(response2){
        console.log(response2)
        //for loop 
            //take the information from the aray (30)
            //for each item make a div
            //we will have a p tag to hold the trail name 
            //we will have a p tag to hold the ascent 
            
        
    });
})