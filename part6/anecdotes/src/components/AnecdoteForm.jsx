import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createAnecdoteNote, clearNote } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addAnecdotes = async (e) => {
    e.preventDefault()

    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    
    dispatch(createAnecdote(content))
    dispatch(createAnecdoteNote(content))
    window.setTimeout(() => {
      dispatch(clearNote())
    }, 5000)
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
