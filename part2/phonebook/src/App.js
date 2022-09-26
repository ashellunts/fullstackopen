import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Filter from './Filter'


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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPattern={newSearchPattern} searchPatternChanged={event => setNewSearchPattern(event.target.value)} />
      <h3>add new</h3>
      <PersonForm
          formSubmitted={addPerson}
          name={newName}
          number={newNumber}
          nameChanged={event => setNewName(event.target.value)}
          numberChanged={event => setNewNumber(event.target.value)} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterByName={newSearchPattern} /> 
    </div>
  )
}

export default App