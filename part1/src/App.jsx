const Hello = ({name, age}) => {
  // Destrukturointi, voidaan laittaa myös suoraan komponenttifunktion parametreiksi
  // const { name, age } = props

  // Nuolifunktion hyödyntäminen
  const bornYear = () => new Date().getFullYear() - age

  // Toimii myös näin:
  /*
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - age
  }
  */

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
    </div>
  )
}

export default App