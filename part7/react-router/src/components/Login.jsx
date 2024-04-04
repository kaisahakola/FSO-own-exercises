/* eslint-disable react/prop-types */
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = (props) => {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
  
    const onSubmit = (event) => {
      event.preventDefault()
      props.onLogin(username)
      navigate('/')
    }

    const handleUsernameChange = (event) => {
      setUsername(event.target.value)
    }
  
    return (
      <div>
        <h2>login</h2>
        <form onSubmit={onSubmit}>
          <div>
            username: 
            <input 
              name="username" 
              value={username} 
              onChange={handleUsernameChange} 
            />
          </div>
          <div>
            password: <input type='password' />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
}

export default Login