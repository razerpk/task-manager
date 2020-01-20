import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import theme from './theme'
import App from './App';
import i18n from './localization/i18n';
import { I18nextProvider } from 'react-i18next';
import { MuiThemeProvider } from '@material-ui/core/styles'

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <MuiThemeProvider theme={theme}>
      <App/>
    </MuiThemeProvider>
  </I18nextProvider>,
  document.getElementById('root')
)



