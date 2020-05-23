// Foursquare API Info
const clientId = 'VIJO33CEYLEEG1BIK1DDMMYEXSJWAH2EKASNT4HIEMDCLKWU';
const clientSecret = 'ICIX5POFWIG2JWTUI3V1APKQBUDEN4DS0US152XB5Y243S5B';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';
const openWeatherKey = '8de2feebf7bdb90c8fb4e39f9968d5d5';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'

// APIXU Info
const apiKey = '';
const forecastUrl = '';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
const city = $input.val();
const urlToFetch=url+city+'&limit=10&client_id='+clientId+'&client_secret='+clientSecret+'&v=20180723';

try {
const response = await fetch(urlToFetch);
if(response.ok){
  const jsonResponse = await response.json();
   const venues = jsonResponse.response.groups[0].items.map(parameter =>parameter.valueToStore);
 console.log(jsonResponse);
  return venues;
   
  }
}

catch(error){
console.log(error);

}
}

const getForecast = async () => {
const urlToFetch = weatherUrl+ '?&q=' + $input.val() + '&APPID=' + openWeatherKey;
  
  try{
const response = await fetch(urlToFetch);
if(response.ok){
  const jsonResponse = await response.json();
  return jsonResponse;

}
  }
catch(error){
console.log(error)
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:

   let venueContent = createVenueHTML(venue.name,venue.location,venuImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
$weatherDivs.forEach(($day, index) => {
    // Add your code here:
 
 

    let weatherContent = createWeatherHTML(day);
    $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
