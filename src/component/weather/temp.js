import React, { useState,useEffect} from 'react';
import './style.css';
import Weathercard from './weathercard';

const Temp = () => {
    const [searchValue, setSearchValue] = useState("delhi");
    const[tempInfo,setTemInfo]=useState({});


    const getWeatherInfo = async () => {
        try {
//             let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=71d8279292cbc83d1cb7a93e8022c351`;
               let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=71d8279292cbc83d1cb7a93e8022c1`;
            
            const res = await fetch(url);
            const data = await res.json();
            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;
            console.log(temp);


          const   NewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            }
            setTemInfo(NewWeatherInfo);
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {

        getWeatherInfo();
    }, [])

    return (
        <>

            <div className="wrap">
                <div className="search">
                    <input type="search" placeholder="Search..." autoFocus id="search" className="searchTerm"
                        value={searchValue} onChange={(e) => setSearchValue(e.target.value)

                        } />
                    <button className="searchButton" type="button" onClick={getWeatherInfo}> Search</button>
                </div>

            </div>

            {/* our temp card */}
            

             <Weathercard tempInfo={tempInfo}/>

        </>
    )
}


export default Temp;
