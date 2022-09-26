import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [searchString, setSearchString] = useState('germa')
  const [countries, setCountries] = useState([])

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
      <>
        <h2> {country.name.common} </h2>
        <b>languages:</b>
        <ul>
          {Object
            .keys(country.languages)
            .map(languageKey => <li key={country.name.common} > {country.languages[languageKey]} </li>)
          }
        </ul>
        <img src={country.flags.png} alt={country.name.common} />
      </>
    )
  } else {
    footer = countriesFound.length > 10
                            ? <p>Too many matches</p>
                            : <ul>
                                {countriesFound.map(country => <li key={country.name.common}>{country.name.common}</li>)}
                              </ul>
  }

  return (
    <div>
      <p>find countries</p>
      <input value={searchString} onChange={event => setSearchString(event.target.value)} />
      {footer}
    </div>
  )
}

export default App