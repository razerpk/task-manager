import React from 'react'
import { useTranslation  } from 'react-i18next'
import {
  AppBar,
  Button,
  Toolbar,
  Typography
} from '@material-ui/core'
import {
  Link
} from 'react-router-dom'

const TopMenu = () => {
  
  const { t } = useTranslation()

  return (
    <AppBar className='topmenu-appbar' position='relative'>
      <Toolbar>
        <Typography variant='h5'>
          Task Manager
        </Typography>
        <Button className='topmenu-button'>
          <Link to={'/'}><h3>{t('tasks')}</h3></Link>
        </Button>
        <Button className='topmenu-button'>
          <Link to={'/about'}><h3>{t('about')}</h3></Link>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default TopMenu