import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    return sortedAnecdotes.filter(
      (anecdote) => anecdote.content.search(filter) >= 0
    )

    // return anecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const votes = (id) => {
    dispatch(vote(id))
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => votes(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
