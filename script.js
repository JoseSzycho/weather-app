class APIManager {
    static API_KEY = "0e5dea7f846151201d9791b821e256f3";

    static getCallLink(city, units = "metric"){
        const callLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&units=${units}`;
        return callLink;
    }
    
    static async getCurrentWeather(city, units) {
        const weatherAPILink = APIManager.getCallLink(city, units);
        const response = await fetch(weatherAPILink);
        const weatherInformation = await response.json();

        return (weatherInformation);
    }

}

APIManager.getCurrentWeather("Posadas", "metric")
    .then(console.log)
    .catch(hola => console.log("feo"))

