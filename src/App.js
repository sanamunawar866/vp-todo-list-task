import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Todo from './Todo';
import { db } from './firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#3f7bc2] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[600px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between w-full mt-4`,
  input: `flex justify-between border p-2 mr-2 text-xl`,
  datepicker: `flex justify-between border p-3 text-xl`,
  button: `border p-4 ml-2 bg-blue-500 text-slate-100`,
  table: `w-full mt-4 border-collapse`,
  th: `bg-gray-300 text-gray-800 font-semibold p-2 text-left`,
  count: `text-center p-2 mt-4`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [filter, setFilter] = useState('all');
  const [activeCount, setactiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const createTodo = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }
    if (input.trim().length <= 10) {
      alert('Todo must be longer than 10 characters');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
      deadline: deadline || null,
    });
    setInput('');
    setDeadline('');
  };

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      let active = 0;
      let completed = 0;
  
      querySnapshot.forEach((doc) => {
        const todo = { ...doc.data(), id: doc.id };
        todosArr.push(todo);
  
        if (!todo.completed) {
          active++;
        } else {
          completed++;
        }
      });
  
      setTodos(todosArr);
      setactiveCount(active);
      setCompletedCount(completed);
      setTotalCount(todosArr.length);
    });
  
    return () => unsubscribe();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return false;
  });

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todos</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Add Todo'
          />
          <DatePicker
            selected={deadline}
            onChange={date => setDeadline(date)}
            className={style.datepicker}
            placeholderText='Select due date'
          />
          <button className={style.button}>
            <AiOutlinePlus size={20} />
          </button>
        </form>
        
        <table className={style.table}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </tbody>
        </table>

        {todos.length < 1 ? null : (
          <p className={style.count}>{`
          All: ${totalCount} |
          Active: ${activeCount} | 
          Completed: ${completedCount} 
          `}</p>
        )}    

      </div>
    </div>
  );
}

export default App;
