/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Home from './components/Home'
import Users from './components/Users'
import Notes from './components/Notes'
import Login from './components/Login'
import Note from './components/Note'
import {
  Routes, 
  Route, 
  Link,
  Navigate,
  useMatch
} from 'react-router-dom'
import { 
  Container, 
  Alert, 
  AppBar, 
  Toolbar,
  Button 
} from '@mui/material'

const App = () => {
  const [message, setMessage] = useState(null)
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/notes/:id')
  const note = match 
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <Container>
      {(message &&
          <Alert severity="success">
            {message}
          </Alert>
      )}

      <div>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              home
            </Button>
            <Button color="inherit" component={Link} to="/notes">
              notes
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>   
            {user
              ? <em>{user} logged in</em>
              : <Button color="inherit" component={Link} to="/login">
                  login
                </Button>
            }                              
          </Toolbar>
        </AppBar>
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </Container>
  )
}

export default App