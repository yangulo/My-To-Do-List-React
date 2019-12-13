import React from 'react'
import ListOfItems from './components/listItems'
import Container from '@material-ui/core/Container'
import './App.css'

function App() {
  
  return (
    <div className="App">
      <Container fixed>
        <h1>My To Do List</h1>
        <ListOfItems/>
      </Container>
    </div>
  )
}

export default App;
