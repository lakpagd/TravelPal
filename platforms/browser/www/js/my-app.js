// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// // Option 1. Using page callback for page (for "about" page in this case) (recommended way):
// myApp.onPageInit('about', function (page) {
//     // Do something here for "about" page

// })

// // Option 2. Using one 'pageInit' event handler for all pages:
// $$(document).on('pageInit', function (e) {
//     // Get page data from event data
//     var page = e.detail.page;

//     if (page.name === 'about') {
//         // Following code will be executed for page with data-page attribute equal to "about"
//         myApp.alert('Here comes About page');
//     }
// })

// // Option 2. Using live 'pageInit' event handlers for each page
// $$(document).on('pageInit', '.page[data-page="about"]', function (e) {
//     // Following code will be executed for page with data-page attribute equal to "about"
//     myApp.alert('Here comes About page');
// })

function onError(){
    console.log(Error);
}

//Function for MAP
function getLocation(){
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
}

function geoCallback(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    updateMap(lat, lng);
}

function initMap() {
    var currentLocation = {lat:latitude, lng:longitude};
    var map = new
                google.maps.Map (document.getElementById('map'),
                { zoom: 15, 
                    center: currentLocation
                });
    var marker = new google.maps.Marker ({
                    position: currentLocation,
                     map: map
                });          
}

function updateMap(latitude, longitude) {
    var currentLocation = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(document.getElementById('map'),
                { zoom: 15,
                    center: currentLocation
                });
    var marker = new google.maps.Marker({
                    position: currentLocation,
                    map: map
                });
}

function getAddress(){
    var http = new XMLHttpRequest();
    var url = 'http://ip-api.com/json/?fields=lat,lon,city,countryCode,currency'

    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);

        var lat = responseJSON.lat;
        document.getElementById('latitude').innerHTML = lat;
            latGlobal = lat;
        
        var lon = responseJSON.lon;
        document.getElementById('longitude').innerHTML = lng;
            lonGlobal = lon;

        var city = responseJSON.city;
        cityGlobal = city;
        var countCode = responseJSON.countryCode.toLowerCase();
        countryCodeGlobal = countCode;
        var currencyLocal = responseJSON.currency;
        currencyGlobal = currencyLocal;
    }
}

// var latGlobal = "";
// var lonGlobal;
var cityGlobal = "";
var countryCodeGlobal = "";
var currencyGlobal = "";

// Displaying Weather for current location
function weatherApi(){
    
    var city = cityGlobal;
    var countryCode = countryCodeGlobal;
    var http = new XMLHttpRequest();
    // const url = 'https://api.openweathermap.org/data/2.5/weather?'
    //             + 'lat=' + lat
    //             + '&lon=' + lon
    //             + '&units=metric&appid=0b7741d49c0e09d34ed63448546843c6';
    var url = 'https://api.openweathermap.org/data/2.5/weather?q='
                + city + ',' + countryCode
                + '&units=metric&appid=0b7741d49c0e09d34ed63448546843c6';
    // const urlHtml is for fetching HTML format
    //const urlHtml = 'https://api.openweathermap.org/data/2.5/forecast/hourly?q=Dublin,ie&mode=html&units=metric&appid=0b7741d49c0e09d34ed63448546843c6';
    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {
        
        // Fetching data in HTML format
        /* var response = http.responseText;
        console.log(response)
        document.getElementById('weather').innerHTML = response; */
              
        //Fetching data in JSON format
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        console.log(response)
        console.log(responseJSON);
        
        var localCity = responseJSON.name;
        document.getElementById('localCity').innerHTML = localCity;

        var temperature = responseJSON.main.temp.toFixed(0);
        document.getElementById('currentTemp').innerHTML = temperature;

        var cloud = responseJSON.clouds.all;
        document.getElementById('cloudPercent').innerHTML = cloud;
        var humid = responseJSON.main.humidity;
        document.getElementById('humidPercent').innerHTML = humid;
        var wind = responseJSON.wind.speed;
        document.getElementById('windSpeed').innerHTML = wind;
        
    }
}

// function test(){
//     var lat = latGlobal;
//     var lng = lonGlobal;
//     console.log(lat);
//     console.log(lng);
// }

function test(){
    fetch('http://ip-api.com/json/?fields=lat,lon')
            .then(function(response) {
                return response.json();
            })
            .then(function(data){
                // var lat = data.lat;
                // var lon = data.lon;
                openCageApi(data.lat, data.lon);
            });

}

// Function to pull current city and country from phone's GPS
function openCageApi(lat, lon) {    
    
    var http = new XMLHttpRequest();
    //var test = 'https://api.opencagedata.com/geocode/v1/json?q=27.659604,85.343806&key=f576d3fbe1d84392b909860a541915d0'
    // var test = 'https://api.opencagedata.com/geocode/v1/json?q='
    //             + city + ',' + countryCode
    //             + '&key=f576d3fbe1d84392b909860a541915d0'

    // var testCct='https://api.opencagedata.com/geocode/v1/json?q=' (53.3307169 -6.2737894)
    // + '53.269604' + '+' + '-9.057529'
    //         //    + '53.3458917' + '+' + '-6.258813'
    //            + '&key=f576d3fbe1d84392b909860a541915d0';
    var url = 'https://api.opencagedata.com/geocode/v1/json?q='
                + lat + '+' + lon
                + '&key=f576d3fbe1d84392b909860a541915d0';
    http.open("GET", url);
    http.send();
    
    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        console.log(response);
        console.log(responseJSON);

        
        var address = responseJSON.results[0].formatted;
        document.getElementById('currentCity').innerHTML = address;
        
    }
}

function currencyConvert(){
	var http = new XMLHttpRequest();
	//var url = 'http://www.apilayer.net/api/live?access_key=2bd7991fcb1e37c5073e35fee8264bef&format=1';
  var urlUSD = 'https://api.exchangeratesapi.io/latest?base=USD';
  
	http.open("GET", urlUSD);
	http.send();

	http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        console.log(response);
        console.log(responseJSON);

        var checkCurrency = responseJSON.rates;
        //console.log(checkCurrency);
        var count;
        for (count in checkCurrency){
            // console.log(count);
            if (count == localCurrencyGlobal){
                var localRate = responseJSON.rates.count;
                console.log(localRate);
                //document.getElementById('test2').innerHTML = localRate;
            }
        }
    
	}
}