/* eslint-disable react/prop-types */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input, Button } from '../styles'

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
            <Input 
              name="username" 
              value={username} 
              onChange={handleUsernameChange} 
            />
          </div>
          <div>
            password: <Input type='password' />
          </div>
          <Button type="submit" primary=''>login</Button>
        </form>
      </div>
    )
}

export default Login