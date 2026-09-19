const API_KEY = '1ae48a1392379feeb989367f50c4133c';

const latitude = 40.7608;
const longitude = -111.8910;


export const weatherApi = async () => {

    const currentTemp =
        document.querySelector("#current-temp");

    const weatherIcon =
        document.querySelector("#current-weather-icon");

    const currentDescription =
        document.querySelector("#current-description");

    const currentHigh =
        document.querySelector("#current-high");

    const currentLow =
        document.querySelector("#current-low");

    const forecastList =
        document.querySelector("#forecast-list");


    const currentUrl =
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

    const forecastUrl =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;


    try {

        const [currentResponse, forecastResponse] =
            await Promise.all([
                fetch(currentUrl),
                fetch(forecastUrl)
            ]);


        if (!currentResponse.ok) {
            throw new Error(
                `Current weather error: ${currentResponse.status}`
            );
        }


        if (!forecastResponse.ok) {
            throw new Error(
                `Forecast error: ${forecastResponse.status}`
            );
        }


        const currentData =
            await currentResponse.json();

        const forecastData =
            await forecastResponse.json();


        console.log("Current Weather:", currentData);
        console.log("Forecast:", forecastData);


        displayCurrentWeather(
            currentData,
            currentTemp,
            weatherIcon,
            currentDescription,
            currentHigh,
            currentLow
        );


        displayForecast(
            forecastData,
            forecastList
        );


    } catch (error) {

        console.error(
            "Weather API Error:",
            error
        );


        currentTemp.textContent = "--";

        currentDescription.textContent =
            "Weather unavailable";

        currentHigh.textContent = "--";

        currentLow.textContent = "--";


        forecastList.innerHTML =
            "<p>Forecast unavailable.</p>";
    }

};



/* =========================
   CURRENT WEATHER
   ========================= */

function displayCurrentWeather(
    data,
    currentTemp,
    weatherIcon,
    currentDescription,
    currentHigh,
    currentLow
) {

    currentTemp.textContent =
        Math.round(data.main.temp);


    currentHigh.textContent =
        Math.round(data.main.temp_max);


    currentLow.textContent =
        Math.round(data.main.temp_min);


    const description =
        data.weather[0].description;


    currentDescription.textContent =
        description;


    const iconCode =
        data.weather[0].icon;


    const iconUrl =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


    weatherIcon.src = iconUrl;

    weatherIcon.alt = description;

    weatherIcon.hidden = false;

}



/* =========================
   THREE DAY FORECAST
   ========================= */

function displayForecast(data, forecastList) {

    forecastList.innerHTML = "";


    const timezoneOffset =
        data.city.timezone;


    const today =
        getLocalDateKey(
            Date.now() / 1000,
            timezoneOffset
        );


    const groupedDays =
        new Map();


    /*
        OpenWeatherMap gives us a forecast
        every 3 hours.

        Here we group all of those entries
        into their individual days.
    */

    data.list.forEach((forecast) => {

        const dateKey =
            getLocalDateKey(
                forecast.dt,
                timezoneOffset
            );


        // Skip today.
        // We only want the NEXT three days.
        if (dateKey === today) {
            return;
        }


        if (!groupedDays.has(dateKey)) {

            groupedDays.set(
                dateKey,
                []
            );

        }


        groupedDays
            .get(dateKey)
            .push(forecast);

    });



    /*
        Get only the first three days.
    */

    const threeDays =
        Array
            .from(groupedDays.entries())
            .slice(0, 3);



    threeDays.forEach(([dateKey, forecasts]) => {


        /*
            Find the forecast closest to noon.

            We'll use this entry for the
            weather icon and description.
        */

        const noonForecast =
            getClosestToNoon(
                forecasts,
                timezoneOffset
            );



        /*
            Find the highest and lowest
            temperatures from all forecasts
            during this day.
        */

        const high =
            Math.max(
                ...forecasts.map(
                    forecast =>
                        forecast.main.temp_max
                )
            );


        const low =
            Math.min(
                ...forecasts.map(
                    forecast =>
                        forecast.main.temp_min
                )
            );



        const dayName =
            getDayName(
                noonForecast.dt,
                timezoneOffset
            );


        const description =
            noonForecast
                .weather[0]
                .description;


        const iconCode =
            noonForecast
                .weather[0]
                .icon;


        createForecastRow(
            forecastList,
            dayName,
            description,
            iconCode,
            high,
            low
        );

    });

}



/* =========================
   CREATE FORECAST ROW
   ========================= */

function createForecastRow(
    forecastList,
    dayName,
    description,
    iconCode,
    high,
    low
) {

    const forecastDay =
        document.createElement("div");

    forecastDay.classList.add(
        "forecast-day"
    );


    // DAY NAME

    const name =
        document.createElement("p");

    name.classList.add(
        "forecast-day-name"
    );

    name.textContent =
        dayName;



    // WEATHER ICON

    const icon =
        document.createElement("img");

    icon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    icon.alt =
        description;



    // DETAILS

    const details =
        document.createElement("div");

    details.classList.add(
        "forecast-details"
    );



    // DESCRIPTION

    const desc =
        document.createElement("p");

    desc.classList.add(
        "forecast-description"
    );

    desc.textContent =
        description;



    // TEMPERATURE

    const temperature =
        document.createElement("p");

    temperature.classList.add(
        "forecast-temperature"
    );

    temperature.textContent =
        `${Math.round(high)}°F / ${Math.round(low)}°F`;



    details.appendChild(desc);
    details.appendChild(temperature);


    forecastDay.appendChild(name);
    forecastDay.appendChild(icon);
    forecastDay.appendChild(details);


    forecastList.appendChild(
        forecastDay
    );

}



/* =========================
   GET LOCAL DATE
   ========================= */

function getLocalDateKey(
    timestamp,
    timezoneOffset
) {

    const date =
        new Date(
            (timestamp + timezoneOffset) * 1000
        );


    return date
        .toISOString()
        .split("T")[0];

}



/* =========================
   GET DAY NAME
   ========================= */

function getDayName(
    timestamp,
    timezoneOffset
) {

    const date =
        new Date(
            (timestamp + timezoneOffset) * 1000
        );


    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            timeZone: "UTC"
        }
    );

}



/* =========================
   FIND FORECAST NEAR NOON
   ========================= */

function getClosestToNoon(
    forecasts,
    timezoneOffset
) {

    return forecasts.reduce(
        (closest, forecast) => {

            const forecastDate =
                new Date(
                    (forecast.dt +
                        timezoneOffset) *
                        1000
                );


            const closestDate =
                new Date(
                    (closest.dt +
                        timezoneOffset) *
                        1000
                );


            const forecastDifference =
                Math.abs(
                    forecastDate
                        .getUTCHours() - 12
                );


            const closestDifference =
                Math.abs(
                    closestDate
                        .getUTCHours() - 12
                );


            if (
                forecastDifference <
                closestDifference
            ) {

                return forecast;

            }


            return closest;

        }
    );

}