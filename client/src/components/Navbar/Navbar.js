import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Navbar_container, list, items,btn} from './Navbar.module.css'
import img from '../../assets/menu.svg'

function Navbar() {

  const [togglemenu, settogglemenu] = useState(false)
  const [screen, setscreen] = useState(window.innerWidth)

  const toggleNav = () =>{
    settogglemenu(!togglemenu)
  }

  useEffect(()=> {
    const changeWidth = () =>{
      setscreen(window.innerWidth)
    }
    window.addEventListener("resize", changeWidth)
  }, [])

  return (
    <div className={Navbar_container}>
      <nav >
        {
          (togglemenu || screen > 700) && (
            <ul className={list}>
              <Link to='/'>
                    <li className={items}>Home</li> 
              </Link>
              <Link to='/countries'>
                    <li className={items}>Countries</li>       
              </Link>
                <Link to='/countries/activities'>
                    <li className={items}>Activities</li>
                </Link>
                <Link to='/countries/activities/create'>
                    <li className={items}>New activity</li>
                </Link>
            </ul>      
          )
        }
        <button onClick={toggleNav} className={btn}><img src={img} alt="Burger menu"/></button>
      </nav>
    </div>
  )
}

export default Navbar