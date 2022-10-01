import { useState, useEffect } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Filter from './Filter'
import Phonebook from './Phonebook'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchPattern, setNewSearchPattern] = useState('')

  useEffect(() => {
    Phonebook.getAll()
      .then(persons => { setPersons(persons) })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    if (newName === "")
      return
    if (newNumber === "") {
      alert("no number entered")
      return
    }
    
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson !== undefined) {
      if (window.confirm(`do you want to update phone number of ${existingPerson.name}`)) {
        const updatedPerson = {...existingPerson, number: newNumber}
        Phonebook.updateNumber(updatedPerson).then(newP => {
          setPersons(persons.map(person => person.name == newP.name ? newP : person))
        })
      } else {
        return
      }
    } else {
      const person = {name: newName, number: newNumber}
      Phonebook.add(person).then(person => { setPersons(persons.concat(person)) })
    }
    setNewName("")
    setNewNumber("")
  }

  function removePerson(personToRemove) {
    Phonebook.remove(personToRemove).then(() => {
      const newPersons = persons.filter(person => personToRemove.id != person.id )
      setPersons(newPersons)
    })
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
      <Persons
          persons={persons}
          filterByName={newSearchPattern}
          onRemovePerson={removePerson} /> 
    </div>
  )
}

export default App