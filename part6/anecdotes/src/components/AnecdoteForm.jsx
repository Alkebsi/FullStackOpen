import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdotes = (e) => {
    e.preventDefault()

    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    dispatch({ type: 'anecdote/createAnecdote', payload: content })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdotes}>
        <div>
          <input name="anecdote" placeholder="Add a new anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
