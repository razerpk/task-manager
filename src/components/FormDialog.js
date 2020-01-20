import React, { useState } from 'react'
import parseTimeToArray from '../functions/parseTimeToArray'
import DateAndTimePicker from './DateAndTimePicker'
import { useTranslation  } from 'react-i18next'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  TextField
} from '@material-ui/core'

const FormDialog = ({ 
  name, 
  icon, 
  title,
  id ,
  content,
  start,
  end,
  description,
  handleSubmit
}) => {

  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [newContent, setNewContent] = useState(content)
  const [newStart, setNewStart] = useState(start)
  const [newEnd, setNewEnd] = useState(end)
  const [newDescription, setNewDescription] = useState(description)

  const handleClickOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  }

  const handleClose = (type) => {
    // reset input values
    if(type === t('cancel')){
      setOpen(false);
      setNewContent(content)
      setNewStart(start)
      setNewEnd(end)
      setNewDescription(description)
    }
    else{
      // type = save 
      if((newContent && newStart && newEnd) !== ''){
        let s = parseTimeToArray(newStart)
        let e = parseTimeToArray(newEnd)

        // check that end time is bigger than start time
        if (parseInt(`${s[0]}${s[1]}${s[2]}${s[3]}${s[4]}`) 
          <= parseInt(`${e[0]}${e[1]}${e[2]}${e[3]}${e[4]}`)) { 
            setOpen(false)
        } else {
          alert('Check your start and end time.')
        }
      }
    }
  }

  const handleContentChange = (event) => setNewContent(event.target.value)
  const handleStartChange = (event) => setNewStart(event.target.value)
  const handleEndChange = (event) => setNewEnd(event.target.value)
  const handleDescriptionChange = (event) => setNewDescription(event.target.value)

  return (
    <>
      <IconButton className={`${title}Button`} color="primary" onClick={(event) => handleClickOpen(event)}>
       {icon}{name}
      </IconButton>

      <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {title} task
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(event) => handleSubmit(event,newContent, newStart, newEnd, newDescription)}>
            Task:
            <Input
              className='form-dialog-inputs'
              required={true}
              value={newContent} 
              onChange={handleContentChange}
            />
            <TextField
              id="outlined-multiline-static"
              className='form-dialog-inputs'
              label={t('description')}
              multiline
              rows="5"
              variant="outlined"
              value={newDescription} 
              onChange={handleDescriptionChange}
            />
            <div>
              <DateAndTimePicker
              className='form-dialog-inputs'
              label={t('startsAt')}
              newStart={newStart}
              handleStartChange={handleStartChange}
              />
            </div>
            <div>
              <DateAndTimePicker
              className='form-dialog-inputs'
              label={t('endsAt')}
              newEnd={newEnd}
              handleEndChange={handleEndChange}
              />
            </div>
            <DialogActions>
              <Button onClick={() => handleClose(t('cancel'))} color="primary">
                {t('cancel')}
              </Button>
              <Button type='submit' onClick={() => handleClose(t('save'))} color="primary">
                {t('save')}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FormDialog