import { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherInCaptial = ({country}) => {
  const [temperature, setTemperature] = useState('')
  const [wind, setWind] = useState('')
  const [icon, setIcon] = useState('')
  const [description, setDescription] = useState('')

  const lat = country.capitalInfo.latlng[0]
  const lng = country.capitalInfo.latlng[1]

  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=0da4deda71d535e40e7543287af92b79`

  axios
      .get(api_url)
      .then(response => {
        const weatherReport = response.data
        setTemperature(weatherReport.main.temp)
        setWind(weatherReport.wind.speed)
        setIcon(`https://openweathermap.org/img/wn/${weatherReport.weather[0].icon}@2x.png`)
        setDescription(weatherReport.weather[0].description)
      })

  return (
    <div>
      <h3> Weather in {country.capital[0]} </h3>
      <p> temperate {temperature} C. </p>
      <p> wind {wind} m/s </p>
      <img src={icon} alt={description} />
      <p> {description} </p>
    </div>
  )
}

const Country = ({country}) => {
  if (country === '') {
    return
  }
  return (
    <div>
      <h2> {country.name.common} </h2>
      <p> capital {country.capital[0]} </p>
      <b>languages:</b>
      <ul>
        {Object
          .keys(country.languages)
          .map(languageKey => <li key={languageKey} > {country.languages[languageKey]} </li>)
        }
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
      <WeatherInCaptial country={country} />
    </div>
  )
}

const App = () => {

  const [searchString, setSearchString] = useState('')
  const [countries, setCountries] = useState([])
  const [countryToBeShown, setCountryToBeShown] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesFound = countries
                            .filter(country => country.name.common.toUpperCase().includes(searchString.toUpperCase()))

  let footer = ""
  if (countriesFound.length === 1) {
    const country = countriesFound[0]
    footer = (
      <Country country={country} />
    )
  } else {
    footer = countriesFound.length > 10
                            ? <p>Too many matches</p>
                            : <div>
                                <ul>
                                  {countriesFound.map(
                                    country =>  <li key={country.name.common}>
                                                  {country.name.common}
                                                  <button onClick={() => setCountryToBeShown(country)} >show</button>
                                                </li>)
                                  }
                                </ul>
                                <Country country={countryToBeShown} />
                              </div>
  }

  return (
    <div>
      <p>find countries</p>
      <input value={searchString} onChange={
        event => {
          setSearchString(event.target.value)
          setCountryToBeShown('')
          }
      } />
      {footer}
    </div>
  )
}

export default App