import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TodoList } from "../../types/api";

interface Props {
  lists: TodoList[];
  handleCompleted: (id: string) => Promise<void>;
  handleDeleteList: (id: string) => Promise<void>;
}

export const TodoLists: React.FC<Props> = (props) => {
  const { lists, handleCompleted, handleDeleteList } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "gray" }}>
          <TableRow>
            <TableCell>text</TableCell>
            <TableCell align="right">completed</TableCell>
            <TableCell align="right">delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lists.map((list) => (
            <TableRow
              key={list.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{
                  textDecoration: list.flag ? "line-through" : "initial",
                }}
              >
                {list.text}
              </TableCell>
              <TableCell align="right">
                <Button variant="text" onClick={() => handleCompleted(list.id)}>
                  completed
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="text"
                  onClick={() => handleDeleteList(list.id)}
                >
                  delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
