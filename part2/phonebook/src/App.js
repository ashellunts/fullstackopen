import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = event => {
    event.preventDefault()
    if (newName === "")
      return
    const newPersons = persons.concat({name: newName})
    setPersons(newPersons)
    setNewName("")
  }

  const nameChange = event => {
    const name = event.target.value
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={nameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name} >{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App