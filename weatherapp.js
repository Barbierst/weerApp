window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.timezone-name');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');
    let temperatureDescriptionTomorrow = document.querySelector('.temperature-description-tomorrow');
    let temperatureDegreeTomorrow = document.querySelector('.temperature-degree-tomorrow');
    let locationTimezoneTomorrow = document.querySelector('.timezone-name-tomorrow');
    let temperatureSectionTomorrow = document.querySelector('.temperature-tomorrow');
    let temperatureSpanTomorrow = document.querySelector('.temperature-tomorrow span');


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/71e236e715c3efa449c4da1640c85346/${lat},${long}`;

            fetch(api)
                .then(response => {
                return response.json();
            })
                .then(data => {
                    console.log(data);
                const { temperature, summary, icon } = data.currently;
                let celsius = (temperature - 32) * (5/9);
        
                //DOM elements veranderen in inhoud van de API

                temperatureDegree.textContent = Math.floor(celsius);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                locationTimezoneTomorrow.textContent = data.timezone;

                    //Formule voor Celsius
            

                    //set icon
                    setIcons(icon, document.querySelector('.icon'));

                    //verander temperatuur naar celsius
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'F') {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = temperature;
                        }
                    })
            })

            fetch(api)
                .then(response => {
                return response.json();
            })
                .then(data => {

                const { apparentTemperatureHigh, summary, icon } = data.daily.data["1"];

                let celsius = (apparentTemperatureHigh - 32) * (5/9);

                temperatureDegreeTomorrow.textContent = Math.floor(celsius);
                temperatureDescriptionTomorrow.textContent = summary;
    

                    //set icon
                    setIcons(icon, document.querySelector('.icon-tomorrow'));

                    //verander temperatuur naar celsius
                    temperatureSectionTomorrow.addEventListener('click', () => {
                        if (temperatureSpanTomorrow.textContent === 'F') {
                            temperatureSpanTomorrow.textContent = 'C';
                            temperatureDegreeTomorrow.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpanTomorrow.textContent = 'F';
                            temperatureDegreeTomorrow.textContent = apparentTemperatureHigh;
                        }
                    })

                })
        });
    } else {
        document.querySelector('.timezone-name').textContent = 'Om het weer te bekijken hebben moet je geolocatie aan staan!';
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color : 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});