import { getDate, getTime } from "./getDateTimeFormat";


export const getWeatherInfo = async ({ lat = '51.509865', lon = '-0.118092' }) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const dayDetail = data.hourly.map(hour => {
            return {
                time: getTime(hour.dt),
                temp: hour.temp,
            }
        })

        const week = data.daily.slice(1,6);

        const weekDetail = week.map(day=>{
            return {
                date: getDate(day.dt),
                temp: {
                    min: day.temp.min,
                    max: day.temp.max,
                },
                hum: day.humidity,
                desc: day.weather[0].main,
                icon: day.weather[0].icon,
            }
        });


        const weatherInfo = {
            city: data.timezone,
            date: data.current.dt,
            lat: data.lat,
            lon: data.lon,
            temp: data.current.temp,
            icon: data.current.weather[0].icon,
            desc: data.current.weather[0].main,
            hum: data.current.humidity,
            wind: data.current.wind_speed,
            day: dayDetail,
            week: weekDetail,
        }

        return weatherInfo
    }
    catch (err) {
        console.log(err);
    }
}
