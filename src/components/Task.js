import React from 'react'
import parseTimeToArray from '../functions/parseTimeToArray'
import FormDialog from './FormDialog'
import tasksService from '../services/tasks'
import { useTranslation  } from 'react-i18next'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControlLabel,
  Typography
} from '@material-ui/core';

const Task = ({ 
  task,
  tasks,
  setTasks 
}) => {

  const { t } = useTranslation()

  // params: 2 arrays with 5 values [year,month,day,hour,minutes]
  // returns: array with 5 values
  const taskDuration = (start, end) => {
    let duration = [0,0,0,0,0]

    duration[0] = end[0] - start[0]
    duration[1] = end[1] - start[1]
    duration[2] = end[2] - start[2]
    duration[3] = end[3] - start[3]
    duration[4] = end[4] - start[4]

    if (end[1] < start[1])
      duration[1] = start[1] - end[1]

    if (end[2] < start[2])
      duration[2] = start[2] - end[2]

    if (end[3] < start[3])
      duration[3] = start[3] - end[3]

    if (end[4] < start[4])
      duration[4] = start[4] - end[4]

    return duration 
  }

  const displayDuration = () => {
    let s = parseTimeToArray(task.start)
    let e = parseTimeToArray(task.end)
    let duration = taskDuration(s, e)
    const suffix = [ 'y', 'm', 'd', 'h', 'min']
    let stringDuration =''
    
    for (let i = 0; i < duration.length; i++) {
      if (duration[i] !== 0)
        stringDuration += `${duration[i]}${suffix[i]} `
    }

    return stringDuration
  }

  const displayTime = (time) => {
    let t = parseTimeToArray(time)
    
    return  (
      <>
      <div>
      {t[3]}:{t[4]}
      </div>
      {t[2]}.{t[1]}.{t[0]}
      </>
    )
  }

  const removeTask = async (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`Confirm the delete of '${task.content}'`)){
        const success = await tasksService.deleteTask(task.id)
        if(success) {
          setTasks(tasks.filter(task1 => task1.id !== task.id))
        }
      }
    } catch (exception) {
      console.log('exception :', exception)
    }
  }

  const updateTask = async (event, content, start, end, description) => {
    event.preventDefault()
    try{
      
      let s = parseTimeToArray(start)
      let e = parseTimeToArray(end)

      // check that end time is bigger than start time
      if (parseInt(`${s[0]}${s[1]}${s[2]}${s[3]}${s[4]}`) 
        <= parseInt(`${e[0]}${e[1]}${e[2]}${e[3]}${e[4]}`)) {
          const changedTask = {
            ...task,
            content: content,
            start: start,
            end: end,
            description: description,
          }
    
          let returnedObject = await tasksService.update(task.id, changedTask)
          setTasks(tasks.map(task1 => task1.id !== task.id ? task1 : returnedObject))
      }

    }catch (exception) {
      console.log('exception :', exception)
    }
  }

  return (

      <ExpansionPanel className='task-panel'>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />} 
          aria-controls={`panel${task.id}-control`}
          id="panel1a-header"
          className='expansion-panel' 
        >
          <div className='start'>
            <FormControlLabel
              className='form-control-edit-button'
              aria-label="edit-button"
              onClick={event => event.stopPropagation()}
              onFocus={event => event.stopPropagation()}
              control={            
              <FormDialog
                icon={<EditOutlinedIcon />}
                title={t('edit')}
                handleSubmit={updateTask}
                id={task.id}
                content={task.content}
                start={task.start}
                end={task.end}
                description={task.description}
              />}
            />
                        <FormControlLabel
              className='form-control-edit-button'
              aria-label="edit-button"
              onClick={event => event.stopPropagation()}
              onFocus={event => event.stopPropagation()}
              control={            
                <IconButton 
                  className='delete-button' 
                  aria-label="delete" 
                  onClick={(event) => removeTask(event)}
                >
                <DeleteForeverOutlinedIcon/>
                </IconButton>
              }
            />

            <div className='task-panel-item'>
              <label>{t('task')}</label>
              <div>
                {task.content}
              </div>
            </div>
          </div>

          <div className='end'>
            <div className='task-panel-item'>
              <label>{t('startsAt')}</label>
              <div>
                {displayTime(task.start)}
              </div>
            </div>

            <div className='task-panel-item'>
              <label>{t('endsAt')}</label>
              <div>
                {displayTime(task.end)}
              </div>
            </div>

            <div className='task-panel-item'>
              <label>{t('duration')}</label>
              <div>
                {displayDuration()}
              </div>
            </div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {task.description}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
  )
}

export default Task;