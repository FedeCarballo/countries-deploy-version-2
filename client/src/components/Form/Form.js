import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createActivity, getAllCountries} from '../../redux/actions'
import Navbar from '../Navbar/Navbar'
import {Form__container, Formcreate, Deletebutton, submit_button, country_list, error_text} from './Form.module.css'

function Form() {

    const [input, setinput] = useState({name:"", difficulty:"",duration:"",season:"",image:"", country: [] })
    const [errors, seterrors] = useState({})
    const [isSubmit, setisSubmit] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
      dispatch(getAllCountries())
    },[])
    const state = useSelector((state) => state.countries)

//First validation with values on input 
const validate = (values) => {
  const errors = {};
  const nameRegular = /^[a-zA-ZÀ-ÿ\s]{4,40}$/
  const UrlRegular = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/g
  const numRegular =   /^[1-9][0-9]*$/
  if  (!values.name) {
      errors.name = "Name is required";
     }
  if(!nameRegular.test(values.name)){
      errors.name = "please enter a valid name: between 4 and 40 words, only letters";
     }
  if  (!values.difficulty){
      errors.difficulty = "Difficulty is required"
      } 
  if  (!values.duration){
      errors.duration = "Duration is required"
      }
  if(values.duration > 11 || values.duration<1 ){
      errors.duration = "Please select a valid Duration: between 1 to 10 hours, Remember, duration cannot be negative"
      }
      else if (!numRegular.test(values.duration)){
        errors.duration = "Please select a valid Duration: between 1 to 10 hours, Remember, duration cannot be negative"
      }
  if (!UrlRegular.test(values.image) ){
      errors.image = "Invalid image url format (example: https://www.impulsonegocios.com/wp-content/uploads/2020/01/ARG-Ven-sub-23.jpg)"
      }
  if  (!values.season){
      errors.season = "Season is required"
      }
  if  (!values.country || values.country.length === 0){
      errors.country = "Almost one country is required"
      }
// Validacion del objeto errors - setea isSubmit en True si todos los campos estan ok
  if ((Object.keys(errors).length) === 0){
    setisSubmit(true)
  };
  return errors 
    }
//Input Handlers: 
  function handleChange(e){
    setinput({
      ...input,
      [e.target.name]: e.target.value
    })
      seterrors(validate({
        ...input,
        [e.target.name] : e.target.value
      }))
   }
  function handlecheckDifficulty(f){
      setinput({
        ...input,
        difficulty: f.target.value
      })
    seterrors(validate({
      ...input,
      difficulty : f.target.value
    }))
  }
  function handlecheckSeason(g){
      setinput({
        ...input,
        season: g.target.value
      })
    seterrors(validate({
      ...input,
      season : g.target.value
    }))
  }
  function handleSelectcountry(c){
    c.preventDefault();
    if(Object.values(input.country).includes(c.target.value)){
      alert("Country already selected")
    }
    else{
        setinput({
      ...input,
      country: [...input.country,c.target.value]
    })  
    }
    seterrors(validate({
      ...input,
      country : [...input.country,c.target.value]
    }))
   }

//Delete Countries selected
   function handleDeleteCountry(d){
    setinput({
      ...input,
      country: input.country.filter(k => k !== d)
    })
  }

//Handle submit Validation:
  async function handlesubmit(s) {
    s.preventDefault();
    seterrors(validate(setinput))
    if(Object.keys(errors).length === 0 && isSubmit){
      dispatch(createActivity(input)) 
      alert("activity created successfully")
      navigate('/countries/activities')
    }
    s.preventDefault()
   }

  return (
    <div>
        <Navbar />
      <div className={Form__container}>
            <div><h1>Create Activity</h1></div>
          <form className={Formcreate} onSubmit={e => handlesubmit(e)}>
              <label>Name:</label>
              <input autocomplete="off" placeholder="activity name.." type="text" name="name" input={input.name} onChange={(e) => handleChange(e)}/>
              {
                <p className={error_text}>{errors.name}</p>
              }
              <label>Difficulty:</label>
                  <select onChange={(e) => handlecheckDifficulty(e)}>
                    <option value="" selected disabled>Select Difficulty</option>
                    <option name="1" value="1">1</option>
                    <option name="2" value="2">2</option>
                    <option name="3" value="3">3</option>
                    <option name="4" value="4">4</option>
                    <option name="5" value="5">5</option>
                  </select>
                  {
                    <p className={error_text}>{errors.difficulty}</p>
                  }
              <label>Duration (in hours):</label>
              <input type="number"  name='duration' placeholder='duration between 1 to 10 hours' input={input.duration}  onChange={(e) => handleChange(e)}/> 
              {
                <p className={error_text}>{errors.duration}</p>
              }
              <label>Season:</label>
              <select onChange={(e) => handlecheckSeason(e)}>
                    <option value="" selected disabled>Select Season</option>
                    <option name="Summer" value="Summer">Summer</option>
                    <option name="Winter" value="Winter">Winter</option>
                    <option name="Spring" value="Spring">Spring</option>
                    <option name="Autum" value="Autum">Autum</option>
                  </select>
              {
                <p className={error_text}>{errors.season}</p>
              }
              <label>image:</label>
              <input autocomplete="off" type="text" name='image' placeholder='paste url here..' input={input.image} onChange={(e) => handleChange(e)}/>
              {
                <p className={error_text}>{errors.image}</p>
              }
              <label>countries:</label>
              <select onChange={(e) => handleSelectcountry(e)}>
              <option selected disabled value=" ">Select Country</option>
                {
                  state.map((e,i)=> 
                   ( <option key={i} value={e.name}>{e.name}</option>)
                  )
                }
              </select>
              {
                <p className={error_text}>{errors.country}</p>
              }
                 { input.country.map(d => <ul className={country_list}>
                    <div>
                      <li>{d}</li> 
                      <button type='button' className={Deletebutton} onClick={() => handleDeleteCountry(d)}>X</button>
                    </div>
                    </ul>)}
                <button type='submit' disabled={Object.keys(errors).length} className={submit_button}>Create Activity</button> 
          </form>
      </div>
    </div>
  )
}

export default Form