import {API_KEY} from "./API_KEY.js";

class APIManager {
    static API_KEY = API_KEY;

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

class Modal {
    static feelsLike;
    static humidity;
    static pressure; 
    static temperature;
    static city;
    static country;

    static getCurrentWeather(){
        event.preventDefault();
        const city = document.getElementById("cityInput").value;
        APIManager.getCurrentWeather(city)
        .then( response => {
            this.feelsLike = response.main.feels_like;
            this.humidity = response.main.humidity;
            this.pressure = response.main.pressure;
            this.temperature = response.main.temp;
            this.city = response.name;
            this.country = response.sys.country;
            Modal.Show();
        })
        .catch(error => alert(error));
    }

    static Show(){
        let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('myModal')) // Returns a Bootstrap modal instance
        
        let modalBody = document.getElementById("modalBody"); 
        modalBody.innerHTML =  `<p>Feels like: ${Math.round(this.feelsLike)}</p>
                                <p>Humidity: ${Math.round(this.humidity)}</p>
                                <p>Pressure: ${Math.round(this.pressure)}</p>
                                <p>Temperature: ${Math.round(this.temperature)}</p>`;

        let modalTtile = document.getElementById("modalTitle");
        modalTtile.innerHTML = `${this.city}, ${this.country}`;
        
        modal.show();
    }
}




const submitButton = document.addEventListener("submit", () => Modal.getCurrentWeather())


    
   