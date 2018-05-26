import React from 'react';
import './weather.css'




class Weather extends React.Component{
  
    GetWeather()
    {
        if( this.props.weatherData===undefined)
        {
            return <p>No weather data</p>
        }
        
        return <div>
                    <div className="weather-header">{this.props.weatherData.name}</div>
                    <div className="weather-conditions">{this.props.weatherData.conditions}</div>
                    <div className="weather-data">Sunrise: {this.props.weatherData.sunrise}</div>
                    <div className="weather-data">Sunset: {this.props.weatherData.sunset}</div>
                </div>

    }

    render()
    {

        return (
                <div>
                    {this.GetWeather()}
                </div>
        )
    }

}

export default Weather