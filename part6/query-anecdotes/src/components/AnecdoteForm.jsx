import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import NotificationContext from '../contexts/NotificationContext'

const AnecdoteForm = () => {
  const [note, dispatchNote] = useContext(NotificationContext, '')
  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      
      dispatchNote({type: 'CREATE', payload: newAnecdote.content})
      window.setTimeout(() => {
        dispatchNote({type: 'NULL'})
      }, 5000)
    },
    onError: () => {
      const msg = 'too short anecdote, must have length 5 or more'
      
      dispatchNote({type: 'ERROR', payload: msg})
      window.setTimeout(() => {
        dispatchNote({type: 'NULL'})
      }, 5000)
    }
  })
 
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
