import React from 'react'
import { Link } from 'react-router-dom'
import {card, button85,card_link,card_text,card_image} from './SingleCard.module.css'
function SingleCard({name, capital,imagen,id,population, continent}) {

  return (
    <div id={id} className={card}>
      <div className={card_text}>
      <h1>{name}</h1> 
      <h2>{continent}</h2>
      <h4>population: <span>{population}</span></h4>
      </div>
      <div className={card_image}>
      <img src={imagen} alt={name}/>
      </div>
      <div className={card_link}>
      <Link to={`/countries/${id}`} content={name}>
         <button className={button85}>Details</button>
     </Link>
      </div>
    </div>
  )
}

export default SingleCard