import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const clone = [...anecdotes]
    const sortedAnecdotes = clone.sort((a, b) => b.votes - a.votes)

    return sortedAnecdotes.filter(
      (anecdote) => anecdote.content.search(filter) >= 0
    )
  })
  const dispatch = useDispatch()

  const votes = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => votes(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
