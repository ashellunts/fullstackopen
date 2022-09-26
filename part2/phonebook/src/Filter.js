const Filter = ({searchPattern, searchPatternChanged}) => {
    return (
      <div>
        search <input value={searchPattern} onChange={searchPatternChanged} />
      </div>
    )
}

export default Filter
