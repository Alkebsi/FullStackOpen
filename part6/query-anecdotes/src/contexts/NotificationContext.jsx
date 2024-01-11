import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'VOTE':
      return `anecdote "${action.payload}" voted`
    case 'CREATE':
      return `anecdote "${action.payload}" created`
    case 'ERROR':
      return action.payload
    case 'NULL':
      return null
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [note, dispatchNote] = useReducer(notificationReducer, '') 
  return ( 
    <NotificationContext.Provider value={[note, dispatchNote]}>
      {props.children}
    </NotificationContext.Provider>
    )
}

export default NotificationContext
