import axios from 'axios'
const baseUrl = '/api/users'

// let token = null

// const setToken = (newToken) => {
//   token = `Bearer ${newToken}`
// }

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}


// const create = async (newObject) => {
//   const config = {
//     headers: { Authorization: token },
//   }
//   const response = await axios.post(baseUrl, newObject, config)
//   return response.data
// }

// const put = async (id, newObject) => {
//   // const config = {
//   //   headers: { Authorization: token },
//   // }
//   const response = await axios.put(`${baseUrl}/${id}`, newObject)
//   return response.data
// }

// const remove = async (id) => {
//   const config = {
//     headers: { Authorization: token },
//   }
//   const response = await axios.delete(`${baseUrl}/${id}`, config)
//   return response.data
// }

export default { getAll, getUser }
