//loqate
//TC99-ZF99-RY89-DD72

$(document).ready(function(){

    // $("button").on("click", function() {
    
    var location = $("#cityDate").val;
    var queryURL2 = "https://api.addressy.com/Geocoding/International/Geocode/v1.10/json3.ws?Key=TC99-ZF99-RY89-DD72&Country=US&Location=" + location 
     
    $.ajax({
        url : queryURL2,
        method: "GET"
    })
    .then(function(response1){
        console.log(response1);
        var lat = (response1.Items["0"].Latitude);
        var long = (response1.Items["0"].Longitude);      
    });
    })