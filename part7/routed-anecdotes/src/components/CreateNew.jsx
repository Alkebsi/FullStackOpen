import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'

const CreateNew = (props) => {
  const content = useField('text', 'content')
  const author = useField('text', 'author')
  const info = useField('url', 'info')

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.attrs.value,
      author: author.attrs.value,
      info: info.attrs.value,
      votes: 0
    })
    
    navigate('/')
  }
  
  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.attrs} />
        </div>
        <div>
          author
          <input {...author.attrs} />
        </div>
        <div>
          url for more info
          <input {...info.attrs} />
        </div>
        <button>create</button>
      </form>
      <button onClick={handleReset}>reset</button>
    </div>
  )

}

export default CreateNew