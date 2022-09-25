import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [searchString, setSearchString] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const countriesToShow = countries
                            .filter(country => country.name.common.toUpperCase().includes(searchString.toUpperCase()))
                            .map(country => <li key={country.name.common}>{country.name.common}</li>)
  
  const countriesToShow2 = countriesToShow.length > 10
                            ? <p>Too many matches</p>
                            : <ul> {countriesToShow} </ul>

  return (
    <div>
      <p>find countries</p>
      <input value={searchString} onChange={event => setSearchString(event.target.value)} />
      <ul>
        {countriesToShow2}
      </ul>
    </div>
  )
}

export default App