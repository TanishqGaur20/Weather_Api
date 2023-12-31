import React, { useState } from 'react';
import rain from './Images/rain.webp'
import sun from './Images/sun.webp'
import cloud from './Images/cloud.webp'

const Home = () => {
    const [Data, setData] = useState(null)
    const [cityName, setcityName] = useState();
    const [time, settime] = useState()
    const [Temp, setTemp] = useState('')
    const [ColorChange, setColorChange] = useState({
        backgroundColor: 'white', color: 'black'
    })
    const [language, setlanguage] = useState('English');
    const [displayLoader, setdisplayLoader] = useState('none')

    const GetApiData = async () => {
        try {
            setdisplayLoader('flex');

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c37d5d9dec17aa92c0a0e095c072627f`);
            if (response.status === 404) {
                setdisplayLoader('none');
                setcityName('');
                alert('Invalid City Name');
                return;
            }
            const data = await response.json();
            setData(data);
            setdisplayLoader('none');

            setTemp(data.main.temp - 273.15);
            if (data.weather[0].main === 'Clouds' || data.weather[0].main === "Mist" || data.weather[0].main === 'Fog') {
                setColorChange({ backgroundColor: '#53545A', color: 'white' });
            } else if (data.weather[0].main === 'Rain') {
                setColorChange({ backgroundColor: '#D5FBFE', color: 'black' });
            } else if (data.weather[0].main === 'Clear') {
                setColorChange({ backgroundColor: '#2B0604', color: 'white' });
            }
            else if (data.weather[0].main === 'Haze') {
                setColorChange({ backgroundColor: '#2B0604', color: 'white' });
            }
            else {
                setColorChange({ backgroundColor: 'white', color: 'black' });
            }
            console.log(data);
            console.log(data.weather[0].main);
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(Data.weather[0].main);
    setInterval(() => {
        settime(new Date().toLocaleString());
    }, 1000);


    return (
        <div>
            {/* <h1>Tanishq</h1> */}
            <div className='Full' style={{ height: '100vh', width: '100vw' }}>
                <div className='FullNav'>
                    The Weather App 24/7
                </div>
                <div className='Middle' style={{ backgroundColor: ColorChange.backgroundColor, color: ColorChange.color }}>
                    <div className='heading'>
                        <h1 style={{ textAlign: 'center', textDecoration: 'underline', textUnderlinePosition: 'under' }}>{language === 'English' ? "Check Weather" : "मौसम की जाँच करें"}</h1>
                        <select onChange={(e) => { setlanguage(e.target.value) }} name="" id="">
                            <option value="English">{language === 'English' ? "Language" : 'भाषा'}</option>
                            <option value="Hindi">हिंदी</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                    <div className='input'>
                        <label className='Label' style={{ display: 'block', fontSize: '22px', margin: '7px 0px 7px 100px' }}>{language === 'English' ? "Enter Your City Name" : 'अपने शहर का नाम दर्ज करें'}</label>
                        <input type="text" value={cityName} onChange={(e) => { setcityName(e.target.value) }} placeholder={language === 'English' ? "Enter Your City Name" : 'अपने शहर का नाम दर्ज करें'} />
                        <button className='button' onClick={GetApiData}>{language === 'English' ? "Search" : 'खोज करें'}</button>
                    </div>
                    <div className='time' style={{ marginTop: '10px' }}>
                        <h3 style={{ textAlign: 'center' }}>{language === 'English' ? "Time : " + time : "समय : " + time}</h3>
                    </div>
                    <div className='Load' style={{ display: displayLoader }}>
                        <div className='Loader'></div>
                    </div>
                    <div className='TempIcon'>
                        <div className='temperature' style={{ marginTop: '40px' }}>
                            <h1>
                                {
                                    Data ?
                                        Temp.toString().substring(0, 4) + (language === 'English' ? '℃ Temperature' : '℃ तापमान') : (language === 'English' ? 'Get Temperature in ℃' : "℃ में तापमान प्राप्त करें")
                                }
                            </h1 >
                            <h1 style={{ marginTop: '15px' }}>
                                {
                                    Data && Data.main ?
                                        Data.main.humidity + (language === 'English' ? '% Humidity' : '% नमी') : (language === "English" ? "Humidity" : "नमी")
                                }
                            </h1>
                            <h1 style={{ marginTop: '15px' }}>
                                {
                                    Data && Data.weather[0] ?
                                        (language === 'English' ? ' Weather : ' : ' मौसम : ') + Data.weather[0].main : (language === "English" ? "Weather" : "मौसम")
                                }
                            </h1>
                        </div>
                        <div className='Icon' style={{ marginTop: '40px' }}>
                            <h1>
                                {Data ? (Data.weather[0].main === 'Clouds' ? <img src={cloud} alt="clouds" style={{ height: '145px' }} /> : (Data.weather[0].main === "Rain" ? <img src={rain} style={{ height: '145px' }} alt="rain" /> : (Data.weather[0].main === 'Clear' ? <img src={sun} style={{ borderRadius: '15px', height: '145px' }} alt="clear" /> : (Data.weather[0].main === 'Mist' ? <img src={cloud} alt="clouds" style={{ height: '145px' }} /> : <img src={cloud} style={{ height: '145px' }} alt="clear" />)))) : null}
                            </h1>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Home