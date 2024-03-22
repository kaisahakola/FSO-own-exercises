import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteServices from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrormMessage] = useState(null /* 'some error happened...' */)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteServices.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteServices.setToken(user.token)
    }
  }, [])

  console.log('render ', notes.length, ' notes')
  // console.log('user: ', user)
  // window.localStorage.removeItem('loggedNoteAppUser')

  const toggleImportanceOf = async (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    try {
      const updatedNote = await noteServices.update(id, changedNote)
      setNotes(notes.map(note => note.id !== id ? note : updatedNote))

      const allNotes = await noteServices.getAll()
      setNotes(allNotes)

    } catch (error) {
      setErrormMessage(
        `Note '${note.content}' was already deleted from server`
      )
      setTimeout(() => {
        setErrormMessage(null)
      }, 5000)

      setNotes(notes.filter(n => n.id !== id))
      console.error(error)
    }
  }

  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()

    const newNote = await noteServices.create(noteObject)
    setNotes(notes.concat(newNote))

    const allNotes = await noteServices.getAll()
    setNotes(allNotes)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      noteServices.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrormMessage('wrong credentials')
      setTimeout(() => {
        setErrormMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload()
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }

      {user &&
        <div>
          <div>
            <p>{`${user.username} logged in`}</p>
            <button onClick={logOut}>log out</button>

            <Togglable buttonLabel="new note" ref={noteFormRef} >
              <NoteForm createNote={addNote} />
            </Togglable>
          </div>

          <div>
            <button onClick={() => setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all'}
            </button>
          </div>

          <ul>
            {notesToShow
              .map(note =>
                <Note
                  key={note.id}
                  note={note}
                  toggleImportance={() => toggleImportanceOf(note.id)}
                />
              )}
          </ul>
        </div>
      }

      <Footer />
    </div>
  )
}

export default App