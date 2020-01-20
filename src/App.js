import React, { useState, useEffect, Suspense } from 'react'
import TaskList from './components/TaskList'
import TopMenu from './components/TopMenu'
import About from './components/About'
import { Container } from '@material-ui/core'
import tasksService from './services/tasks'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

const App = () => {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await tasksService.getAll()
      setTasks(data)
    }
    fetchData()
  },[]) // eslint-disable-line

  return (
    <Suspense fallback="loading">
      <Container className='body-container'>
        <Router>
          <TopMenu />
          <Route exact path="/">
            <TaskList tasks={tasks} setTasks={setTasks} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Router>
      </Container>
    </Suspense>
  )
}

export default App;
