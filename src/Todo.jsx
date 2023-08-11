import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  liOverdue: `flex justify-between bg-red-200 p-4 my-2 capitalize`,
  liCompleteOverdue: `flex justify-between bg-red-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  textOverdue: `ml-2 cursor-pointer line-through text-red-600`,
  textCompleteOverdue: `ml-2 cursor-pointer line-through text-red-800`,
  button: `cursor-pointer flex items-center`,
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  const now = new Date();
  const deadline = todo.deadline ? new Date(todo.deadline.seconds * 1000) : null; 
  const isOverdue = deadline && deadline < now;

  return (
    <tr
      className={
        isOverdue
          ? todo.completed
            ? style.liCompleteOverdue
            : style.liOverdue
          : todo.completed
          ? style.liComplete
          : style.li
      }
    >
      <td>
        <div className={style.row}>
          <input
            onChange={() => toggleComplete(todo)}
            type="checkbox"
            checked={todo.completed}
          />
          <p
            onClick={() => toggleComplete(todo)}
            className={
              isOverdue
                ? todo.completed
                  ? style.textCompleteOverdue
                  : style.textOverdue
                : todo.completed
                ? style.textComplete
                : style.text
            }
          >
            {todo.text}
          </p>
        </div>
      </td>
      <td>
        {deadline ? new Intl.DateTimeFormat('en-US').format(deadline) : 'No Deadline'}
      </td>
      <td>{isOverdue ? 'Overdue' : todo.completed ? 'Completed' : 'Pending'}</td>
      <td>
        <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
      </td>
    </tr>
  );
};

export default Todo;
