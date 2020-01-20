import React from 'react'
import {
  makeStyles,
  TextField 
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginRight: theme.spacing(1),
    width: 230,
    padding: 6,
  },
}));

const DateAndTimePicker = ({ 
  label,
  newEnd,
  newStart,
  handleEndChange,
  handleStartChange 
}) => {
  const classes = useStyles()

  return (
    <div className={classes.container} noValidate>
      <TextField
        label={label}
        type="datetime-local"
        className={classes.textField}
        required={true}
        value={newEnd || newStart} 
        onChange={handleEndChange || handleStartChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  )
}

export default DateAndTimePicker