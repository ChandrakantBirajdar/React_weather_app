import Style from "./Weather.module.css"
import sear from "../assets/search.png"
import fullsun from "../assets/fullsun.png"
import cld from "../assets/cloud.png"
import rn from "../assets/rain.png"
import speed from "../assets/speed.png"
import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"

function Weather() {

    const [weather,setWeather]=useState(false);

    const Allicon={
        "01d":fullsun,
        "02d":fullsun,
        "03n":fullsun    ,
        "04d":cld,
        "50n":rn,
        "10d":rn
    }
    const inputRef=useRef();
    const search = async (city)=>{

        try {
                const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e0860b172bfe30b7b8d718d86052de6e`

                const response=await fetch(url)
                const data=await response.json();
                const icon=Allicon[data.weather[0].icon] || Allicon["03n"]
                console.log("icon:"+icon)
                setWeather({
                    name:data.name,
                    speed:data.wind.speed,
                    humidity:data.main.humidity,
                    temp:Math.floor(data.main.temp),
                    icon:icon
                    
                });
                console.log(data)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{

        search("pune")
    },[])

    return (

        <>
            <div className={Style.wrapper}>
                <div className={Style.searchbar}>
                    <input ref={inputRef} type="text" placeholder="Search" />
                    <img src={sear}  onClick={()=>search(inputRef.current.value)} alt="img not found" />
                </div>
                <div className={Style.container}>
                    <img src={weather.icon} alt="not found" />
                </div>
                <div className={Style.subcontainer}>
                    <h1>{weather.temp}°C</h1>
                    <p>{weather.name}</p>
                </div>
                <div className={Style.thirdcontainer}>

                    <div className={Style.firstContainer}>
                    
                        <h1>{weather.humidity}%</h1>
                    </div>
                    
                    <div className={Style.secoendContainer}>
                        <img src={speed} alt="not found" />
                        <h1>200km/h</h1>
                    </div><br />
                   

                </div>
                <div className={Style.lastContainer}>
                        <p>
                            Humidity
                        </p>
                        <p>speed</p>
                    </div>


            </div>

        </>
    );
}
export default Weather;