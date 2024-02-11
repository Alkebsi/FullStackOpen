import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const { content, author, votes, info } = anecdotes.find((n) => n.id === Number(id))
  
  return (
    <div>
      <h2>{ content } by { author }</h2>
      <p>has { votes } votes</p>
      <p>for more info see <a href={ info }>{ info }</a></p>
    </div>
  )
}

export default Anecdote