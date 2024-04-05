/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { 
  TableContainer, 
  TableBody, 
  Table, 
  TableRow, 
  TableCell,
  Paper
} from '@mui/material'

const Notes = ({ notes }) => (
    <div>
      <h2>Notes</h2>
      <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map(note => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>
                {note.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
)

export default Notes