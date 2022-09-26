const PersonForm = ({formSubmitted, name, number, nameChanged, numberChanged}) => {
    return (
      <form onSubmit={formSubmitted}>
          <div>
            name: <input value={name} onChange={nameChanged} />
          </div>
          <div>
            number: <input value={number} onChange={numberChanged} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
    )
}

export default PersonForm