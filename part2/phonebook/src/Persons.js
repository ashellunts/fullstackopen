function containsCaseInsensitive(string, pattern) {
    return string.toUpperCase().includes(pattern.toUpperCase())
}

const Persons = ({persons, filterByName}) => {
    const personsFiltered = persons
        .filter(person => filterByName === "" || containsCaseInsensitive(person.name, filterByName) )
        .map(person => <li key={person.id}>{person.name} {person.number}</li>)

    return (
        <ul>
        {personsFiltered}
        </ul>
    )
}

export default Persons