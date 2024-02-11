const Anecdote = ({ anecdote }) => {
  const { content, author, votes, info } = anecdote
  
  return (
    <div>
      <h2>{ content } by { author }</h2>
      <p>has { votes } votes</p>
      <p>for more info see <a href={ info }>{ info }</a></p>
    </div>
  )
}

export default Anecdote