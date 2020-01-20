import React from 'react'
import parseTimeToArray from '../functions/parseTimeToArray'
import Task from './Task'
import FormDialog from './FormDialog'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import tasksService from '../services/tasks'
import {
  Paper
} from '@material-ui/core';
import { useTranslation  } from 'react-i18next'

const TaskList = ({ tasks, setTasks }) => {

  const { t } = useTranslation()
  
  const addTask = async (event,content, start, end, description) => {
    event.preventDefault()
    try{

      let s = parseTimeToArray(start)
      let e = parseTimeToArray(end)

      // check that end time is bigger than start time
      if (parseInt(`${s[0]}${s[1]}${s[2]}${s[3]}${s[4]}`) 
        <= parseInt(`${e[0]}${e[1]}${e[2]}${e[3]}${e[4]}`)) {
          const taskObject = {
            content: content,
            start: start,
            end: end,
            description: description,
          }
          const returnedObject = await tasksService.create(taskObject)
          setTasks(tasks.concat(returnedObject))

      }
      
    } catch (exception) {
      console.log('exception :', exception)
    }
  }
  return (
    <Paper className='body-paper'>
      <FormDialog
      name={t('new')}
      icon={<AddCircleOutlineIcon />}
      title={t('add')}
      handleSubmit={addTask}
      id={''}
      content={''}
      description={''}
      start={'2020-01-01T00:00'}
      end={'2020-01-01T00:00'}
      />

      <div className='task-panels'>
        {tasks.map(task => 
          <Task 
          key={task.id}
          task={task}
          tasks={tasks}
          setTasks={setTasks}
          />
        )}
      </div>
    </Paper>
  )
}

export default TaskList;