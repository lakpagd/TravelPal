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
    // openCageApi(lat, lng);
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
    var url = 'http://ip-api.com/json/?fields=lat,lon,city,country,countryCode,currency';

    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);

        var lat = responseJSON.lat;
        document.getElementById('latitude').innerHTML = lat;
        var lon = responseJSON.lon;
        document.getElementById('longitude').innerHTML = lon;
        var city = responseJSON.city;
        document.getElementById('city').innerHTML = city;
        cityGlobal = city;
        var country = responseJSON.country;
        document.getElementById('country').innerHTML = country;
        var countCode = responseJSON.countryCode.toLowerCase();
        countryCodeGlobal = countCode;
        var currencyLocal = responseJSON.currency;
        document.getElementById('localCurrency').innerHTML = currencyLocal;
        
    }
}

// var latGlobal = "";
// var lonGlobal;
var cityGlobal = "";
var countryCodeGlobal = "";
var currencyGlobal = "";


//    var https = require('https');

function currencyConvert() {
    //var apiKey = '369b1790c4df3611c89b';
    var fromCurrency = "USD";
    var toCurrency = "EUR"
    var query = fromCurrency + '_' + toCurrency;
    
    var url = 'https://free.currconv.com/api/v7/convert?q='+query+'&compact=ultra&apiKey=369b1790c4df3611c89b';
    // var url = 'http://data.fixer.io/api/convert?access_key=f34a9da8ff3a052b9324e95d4828020a&from=USD&to='
    //             + toCurrency
    //             + '&amount='
    //             + amount;
    var http = new XMLHttpRequest();
    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        // console.log(response);
        // console.log(responseJSON);
        
        var localRate = responseJSON.USD_EUR;
        var input = document.getElementById('usDollar').value;

        var result = localRate * input;
        document.getElementById('result').innerHTML = result;
    }
}


// function currencyConvert(){
//     var localCurrency = currencyGlobal;
//     console.log(localCurrency);
//     var http = new XMLHttpRequest();

//     var url = 'https://data.fixer.io/api/convert?access_key=& from = GBP
//     & to = JPY
//     & amount = 25

// 	//var url = 'http://www.apilayer.net/api/live?access_key=2bd7991fcb1e37c5073e35fee8264bef&format=1';
//     var urlUSD = 'https://api.exchangeratesapi.io/latest?base=USD';
  
// 	http.open("GET", urlUSD);
// 	http.send();

// 	http.onreadystatechange = (e) => {
//         var response = http.responseText;
//         var responseJSON = JSON.parse(response);
//         // console.log(response);
//         // console.log(responseJSON);

//         var checkCurrency = responseJSON.rates;
//         //console.log(checkCurrency);
//         document.getElementById('localCurrency').innerHTML = localCurrency;
//         var count;
//         for (count in checkCurrency){
//             //  console.log(count);
//             if (count === currency){
//                 //var localRate = responseJSON.rates.count;
//                 // console.log(currency);
//                 //document.getElementById('test2').innerHTML = localRate;
//             }
//         }
    
// 	}
// }


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