import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notifications }) => {
    return notifications
  })
  
  let style = {
    border: 'none'
  }
  
  if (notification) {
    console.log('works')
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
    }
  } else {
    console.log('doesnt')
    style = {
      border: 'none',
      padding: 0,
      borderWidth: 0,
    }
  }

  return <div style={style}>{ notification }</div>
}

export default Notification
