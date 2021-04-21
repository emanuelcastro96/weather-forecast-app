import { getTime } from "./getTime";


export const getWeatherInfo = async ({lat='51.509865', lon='-0.118092'}) => {
    const apiKey = `34c52db37a4556ce1f5e005f41025285`
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
        
        
        const weatherInfo = {
            date: data.current.dt,
            lat: data.lat,
            lon: data.lon,
            temp: data.current.temp,
            icon: data.current.weather[0].icon,
            desc: data.current.weather[0].main,
            hum: data.current.humidity,
            wind: data.current.wind_speed,
            day: dayDetail,
        }
        
        return weatherInfo
    } catch (err) {
        console.log(err);
    }
}
