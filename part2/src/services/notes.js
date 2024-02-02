import axios from 'axios'
const baseUrl = '/'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = newObject => {
  const request = axios.post(`${baseUrl}/api/notes`, newObject)
  return request.then(response => {
    return response.data
  })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/api/notes/${id}`, newObject)
  return request.then(response => {
    return response.data
  })
}

export default { getAll, create, update }