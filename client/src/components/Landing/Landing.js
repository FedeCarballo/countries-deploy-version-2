import React from 'react'
import { Link } from 'react-router-dom'
import Links from '../Links/Links'
import {button85, PrincipalContainer, Title,ContainerLanding,ContainerLinks,SocialLinks,wave,Author} from './Landing.module.css'
import logo from '../../assets/logo.jpg'
function Landing() {
  return (
    <div className={PrincipalContainer}>
      <div className={ContainerLanding}>
        <div className={Title}>
          <h1>Time to <span>Travel</span></h1>

        </div>
        <Link to="/countries">
          <button className={button85}>Let's Go</button>
        </Link>
          <img src={logo} alt="Tavels logo"/>
      </div>
      <div className={ContainerLinks}>
        <div className={wave}></div>
        <div className={SocialLinks}>
          <Links />
        </div>
        <h4 className={Author}>
          Designed By: Federico Carballo
        </h4>
      </div>
    </div>
  )
}

export default Landing