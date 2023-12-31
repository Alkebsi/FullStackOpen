import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notifications }) => {
    return notifications
  })
  
  let style = {
    border: 'none'
  }
  
  if (notification) {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
    }
  } else {
    style = {
      border: 'none',
      padding: 0,
      borderWidth: 0,
    }
  }

  return <div style={style}>{ notification }</div>
}

export default Notification
