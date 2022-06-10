import React from 'react'
import linkedin from '../../assets/GH and Ldn/linkedin.png'
import github from '../../assets/GH and Ldn/github.png'
import {Links_Div} from './Links.module.css'
function Links() {
  return (
    <div className={Links_Div}>
        <a href="https://www.linkedin.com/in/federico-concepcion-carballo-benitez/" target="_blank" rel="noreferrer"><img src={linkedin} alt='Linkedin' /></a>
        
        <a href="https://github.com/FedeCarballo" target="_blank" rel="noreferrer"><img src={github} alt='Github' /></a>
    </div>
  )
}

export default Links