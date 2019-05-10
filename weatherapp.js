window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.timezone-name');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/71e236e715c3efa449c4da1640c85346/${lat},${long}`;

            fetch(api)
                .then(response => {
                return response.json();
            })
                .then(data => {
                const { temperature, summary, icon } = data.currently;
                //DOM elements veranderen in inhoud van de API

                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                    //Formule voor Celsius
                    let celsius = (temperature - 32) * (5/9);

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