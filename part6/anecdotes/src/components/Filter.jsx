import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducers'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    dispatch(filterChange(new RegExp(e.target.value, 'ig')))
  }

  return (
    <div>
      filter{' '}
      <input
        name="filter"
        onChange={handleChange}
        placeholder="search here..."
      />
      <br />
      <br />
    </div>
  )
}

export default Filter
