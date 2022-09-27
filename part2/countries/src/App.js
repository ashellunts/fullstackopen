import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({weatherReport}) => {
  return (
    <div>
      <h3> Weather in Xxx </h3>
      <p> Temperate xxx </p>
      <img src="link" alt="weather img" />
      <p> Wind xxx </p>
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
      <p> Capital xxx </p>
      <p> Area xxx </p>
      <b>languages:</b>
      <ul>
        {Object
          .keys(country.languages)
          .map(languageKey => <li key={country.name.common} > {country.languages[languageKey]} </li>)
        }
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
      <Weather />
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