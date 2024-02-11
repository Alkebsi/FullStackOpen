import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => {
        return (
          <li key={anecdote.id} >
            <Link to={`/anecdote/${anecdote.id}`}>
              {anecdote.content}
            </Link>
          </li>
        )
      })}
    </ul>
  </div>
)

export default AnecdoteList