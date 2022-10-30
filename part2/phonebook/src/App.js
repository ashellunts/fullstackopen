import { useState, useEffect } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Filter from './Filter'
import PhonebookService from './PhonebookService'
import Footer from './Footer'
import Notification from './Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearchPattern, setNewSearchPattern] = useState('')
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        PhonebookService.getAll()
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

        const person = { name: newName, number: newNumber }
        PhonebookService
            .add(person)
            .then(person => {
                setPersons(persons.concat(person))
                setNotification({ text: `${person.name} is added to phonebook`, type: 'info' })
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
            .catch(error => {
                console.log(error)
                setNotification({ text: error.response.data.error, type: 'error' })
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })

        setNewName("")
        setNewNumber("")
    }

    function removePerson(personToRemove) {
        PhonebookService.remove(personToRemove).then(() => {
            const newPersons = persons.filter(person => personToRemove.id !== person.id)
            setPersons(newPersons)
        }).catch(error => {
            const newPersons = persons.filter(person => personToRemove.id !== person.id)
            setPersons(newPersons)
            setNotification({ text: `${personToRemove.name} is already removed from phonebook`, type: 'error' })
            setTimeout(() => {
                setNotification(null)
            }, 5000);
        })
    }

    return (
        <div>
            <Notification notification={notification} />
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
            <Footer />
        </div>
    )
}

export default App