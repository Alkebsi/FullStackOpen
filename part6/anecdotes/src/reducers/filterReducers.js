const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}

export const filterChange = (filter) => {
  return {
    type: 'FILTER',
    payload: filter,
  }
}

export default filterReducer
