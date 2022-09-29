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
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the list`)
      return
    }
    if (newNumber === "")
    {
      alert("no number entered")
      return
    }

    const person = {name: newName, number: newNumber}
    Phonebook.add(person).then(person => { setPersons(persons.concat(person)) })
    setNewName("")
    setNewNumber("")
  }

  // function updateNumber(updated) {
  //   Phonebook.updateNumber(updated).then((newP) => {
  //     //const newPersons = 
  //     setPersons([newP])
  //   })
  // }

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