import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchPattern, setNewSearchPattern] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    if (newName === "")
      return
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the list`)
      return
    }
    if (newNumber === "")
    {
      alert("no number entered")
      return
    }
    const maxID = persons.reduce((previousMax, person) => Math.max(previousMax, person.id), 0)
    const newPersons = persons.concat({name: newName, number: newNumber, id: maxID + 1})
    setPersons(newPersons)
    setNewName("")
    setNewNumber("")
  }

  const nameChange = event => {
    setNewName(event.target.value)
  }
  const numberChange = event => {
    setNewNumber(event.target.value)
  }
  const searchPatternChange = event => {
    setNewSearchPattern(event.target.value)
  }

  const personsFiltered = persons
                            .filter(person => newSearchPattern === "" || containsCaseInsensitive(person.name, newSearchPattern) )
                            .map(person => <li key={person.id}>{person.name} {person.number} </li>)

  return (
    <div>
      <h2>Phonebook</h2>
      search <input value={newSearchPattern} onChange={searchPatternChange} />
      <h3>add new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={nameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsFiltered}
      </ul>
    </div>
  )
}

export default App

function containsCaseInsensitive(string, pattern) {
  return string.toUpperCase().includes(pattern.toUpperCase())
}