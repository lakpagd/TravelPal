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

// Function to pull current city and country from phone's GPS
function openCageApi() {
    var http = new XMLHttpRequest();
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=53.346+-6.2588&key=f576d3fbe1d84392b909860a541915d0';
    http.open("GET", url);
    http.send();
    
    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        console.log(response);
        console.log(responseJSON);

        
        var city = responseJSON.results[0].components.city;
        document.getElementById('currentCity').innerHTML = city;
        var country = responseJSON.results[0].components.country;
        document.getElementById('currentCountry').innerHTML = country;

        // fetching local Currency
        var localCurrency = responseJSON.results[0].annotations.currency.iso_code;
        localCurrencyGlobal = localCurrency;
        //document.getElementById('currency').innerHTML = localCurrency;

    }
}

var localCurrencyGlobal = "";

// converting currency
function currencyConvert(){
    var http = new XMLHttpRequest();
    console.log(localCurrencyGlobals);
    const url = 'http://www.apilayer.net/api/live?access_key=2bd7991fcb1e37c5073e35fee8264bef&format=1';
    http.open("GET", url);
    http.send();
    
    http.onreadystatechange = (e) => {
         var response = http.responseText;
         var responseJSON = JSON.parse(response);

         document.getElementById('currency').innerHTML = localCurrencyGlobal;
       
          //var localCurrency = responseJSON.results[0].annotations.currency.iso_code;
        // var cur = document.getElementById('currency');
        // alert(cur);
        //document.getElementById('localCurrency').innerHTML = localCurrency1;
        // var currency = document.getElementById('currency').localCurrency;
        // document.getElementById('test').innerHTML = test;
        
        // if (condition) {
            
        // } else {
            
        // }
        //var dollar = document.getElementById('dollar');
        // var euro = responseJSON.quotes.USDEUR;
        // //var currency = dollar * euro;
        // document.getElementById('posEuro').innerHTML = euro;
        
    }
}

// Displaying Weather for current location

function weatherApi(){
    var http = new XMLHttpRequest();
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Dublin,ie&units=metric&appid=0b7741d49c0e09d34ed63448546843c6';
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

        var currentTemp = responseJSON.main.temp.toFixed(0);
        document.getElementById('currentTemp').innerHTML = currentTemp;

        var weather = "<table>";
        //for (var i = 0; i < 3; i++){
            weather = weather + "<tr><td> Clouds: </td><td>";
            weather += responseJSON.clouds.all + "%";
            weather += "</td></tr><tr><td> Humidity: </td><td>" + responseJSON.main.humidity + "%";
            weather += "</td></tr><tr><td> Wind: </td><td>" + responseJSON.wind.speed + "m/s" + "</td></tr>";
        //}
        weather += "</table>"
        document.getElementById('weatherInfo').innerHTML = weather;        
    
    }
}