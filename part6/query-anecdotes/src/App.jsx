import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useReducer } from 'react'
import NotificationContext from './contexts/NotificationContext'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'VOTE':
      return `anecdote "${action.payload}" voted`
    case 'CREATE':
      return `anecdote "${action.payload}" created`
    case 'ZERO':
      return ''
  }
}

const App = () => {
  const [ note, dispatchNote ] = useReducer(notificationReducer, '')
  
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map((anecdote) => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote, 
      votes: anecdote.votes + 1
    })
    dispatchNote({type: 'VOTE', payload: anecdote.content})
  }
  
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result))) 
  
  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if ( result.isError ) {
    return <div>anecdote service is not available due to problems in server</div>
  }
  
  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[ note, dispatchNote ]}>
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
