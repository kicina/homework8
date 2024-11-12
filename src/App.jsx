import './App.css'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { darktheme, lighttheme } from './themes'
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    transition: all 0.3s;
  }
  body{
    background-color: ${props => props.theme.background};
  }
`


function App() {

  const [isdark, setisdark] = useState(false)
  const [todos, settodos] = useState([]);
  const [input, setinput] = useState('');

  const handleaddtodo = () => {
    if (input.trim()) {
      settodos([...todos, { text: input, completed: false }]);
      setinput('');
    }
  };

  const toggletodo = (showtodo) => {
    const newTodos = todos.map((todo, i) => 
      i === showtodo ? { ...todo, completed: !todo.completed } : todo
    );
    settodos(newTodos);
  };

  const deletetodo = (showtodo) => {
    settodos(todos.filter((_, i) => i !== showtodo));
  };


  return (
    <ThemeProvider theme={isdark ? darktheme : lighttheme}>
      <GlobalStyle />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Text>todo app</Text>
      <input 
          type="text" 
          value={input} 
          onChange={(e) => setinput(e.target.value)} 
          placeholder="add new todo" 
        />
        <Button onClick={handleaddtodo}>add todo</Button>
        <Button onClick={() => setisdark(!isdark)}>dark/light</Button>
        <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo, showtodo) => (
          <Text 
            key={showtodo} 
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggletodo(showtodo)} 
            />
            {todo.text}
            <Button onClick={() => deletetodo(showtodo)}>delete</Button>
          </Text>
        ))}
      </ul>
    </div>
    </ThemeProvider>
  )
}

const Text = styled.h1`
color: ${props => props.theme.color};
font-size: 16px;
@media (width > 500px){
  font-size: 30px;
}
`
const Button = styled.button`
  background-color: ${props => props.theme.btnbg};
  border-radius: 6px;
  border: ${props => props.theme.btnborder};
  color: ${props => props.theme.btntext};
`

export default App
