import React from 'react'
import { Link } from 'react-router-dom'
import image from '../../assets/404.webp'
import {err, button85} from './ErrorPage.module.css'

function ErrorPage() {
  return (
    <div className={err}>
      <Link to='/'>
        <button className={button85}>
          Back to home
        </button>
      </Link>
      <h1>
        Oops.. Error 404, page not found
      </h1>
      <h2>
        Nothing to do here
      </h2>
      <img src={image} alt='a 404 space cat'>
      </img>
      <h2>
        (here's a space cat for your trouble)
      </h2>
    </div>
  )
}

export default ErrorPage