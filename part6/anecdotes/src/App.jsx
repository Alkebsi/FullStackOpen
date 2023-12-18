import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, vote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const votes = (id) => {
    dispatch(vote(id))
  }

  const addAnecdotes = (e) => {
    e.preventDefault()

    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => votes(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdotes}>
        <div>
          <input name="anecdote" placeholder="Add a new anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
