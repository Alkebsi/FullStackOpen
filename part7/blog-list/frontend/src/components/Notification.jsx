import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {

  const message = useSelector((state) => state.notification.notification)
  const type = useSelector((state) => state.notification.type)

  if (!message) {
    return null
  }

  return (
    <div className="container">
      <Alert variant={type}>{message}</Alert>
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
}

export default Notification
