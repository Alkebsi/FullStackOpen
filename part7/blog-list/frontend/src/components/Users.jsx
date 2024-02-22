import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import userService from '../services/users'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = ({ user }) => (
  <tr>
    <th><Link to={`/users/${user.id}`}>{user.username}</Link></th>
    <th>{user.blogs.length}</th>
  </tr>
)

User.propTypes = {
  user: PropTypes.object.isRequired,
}

const Blogs = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await userService.getAll())
    }
    getUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th style={{ padding: 5 }}>Username</th>
            <th style={{ padding: 5 }}>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs
