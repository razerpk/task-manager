import React from 'react'
import { useTranslation  } from 'react-i18next'
import {
  Paper, 
} from '@material-ui/core';

const About = () => {

  const { t } = useTranslation()

  return (
    <Paper className='about-paper'>
      <p className='about-content'>
        <strong>{t('madeBy')}</strong> Rico Pietarinen
      </p>
      <label className='about-content'>
        <strong>Yhteenveto:</strong>
      </label>
      <p className='about-content'>
        Sivuja tehdessä minulle uutena asiana tuli kielellistys kirjaston i18next myötä sekä 
        Hash Routerin käyttö, vaikka React routereista onkin 
        aikaisempaa kokemusta suorittamaltani kesäkurssilta. 
        Lisäksi Storybookin tarjoama dev kehitysympäristön käyttö jäi vain dokumentaation lukemiseksi.
        <br/>
        Sivuston ulkoasu voisi olla mielestäni hieman paremmin sommiteltu ja seuraavalla kerralla samanlaista sivustoa kehittäessä
        käyttäisin material-uin Card komponenttia. Käytin sivustoa tehdessä flexboxia, mitä en ole käyttänyt hirveästi.
        Ohjelmakoodi sen sijaan on mielestäni laadukkaampaa verrattuna UI:hin. Sivujen tekemiseen kulunut kokonaistuntimäärä on 
        noin 7-8h.
        
      </p>
    </Paper>
  )
}

export default About;