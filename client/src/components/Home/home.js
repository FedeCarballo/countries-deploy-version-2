import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '../Pagination/Pagination';
import {  getAllActivities, getAllCountries} from '../../redux/actions'
import SingleCard from '../SingleCard/SingleCard';
import Loading from '../Loading/Loading';
import {CardsContainer,button,Container} from './Home.module.css'
import Navbar from '../Navbar/Navbar';
import Searchbar from '../Searchbar/Searchbar';

function Home() {
    const [currentpage, setcurrentpage] = useState(1);
    const [countriesperpage] = useState(10);
    const [loading, setloading] = useState(false);
    const countries = useSelector( state => state.countries);
    const dispatch = useDispatch()

    useEffect(()=>{
       dispatch(getAllCountries())
       dispatch(getAllActivities())
    },[dispatch])
    
    //-----------------Loading page------------------// 
    useEffect(()=>{
        setTimeout(() => {
            setloading(true)
        },1500)
    })
    function HandleOrder(e){
        setloading(false)
    }
    //-----------------Loading page------------------// 

    //-----------------Pagination------------------// 
    
    const indexLastCountries = currentpage * countriesperpage; //10
    const indexFirtsCountries = indexLastCountries - countriesperpage; //0
    const currentCountries = countries.slice(indexFirtsCountries,indexLastCountries); //arrray with 10 countries
    const paginate = (n) => setcurrentpage(n)
    
    //-----------------Pagination------------------// 


    return (
    <div>
        <div>
        <Navbar />
        </div>
        <div className={Container}>
        <Searchbar />
        <div className={button}>
        <button onClick={(e) => HandleOrder(e)} >
                Order
        </button>
        </div>
        {
            loading === false ? 
            <Loading /> : 
            <div>
        <div className={CardsContainer}>
            {currentCountries.map((e,i) => 
            <SingleCard key={i} 
            continent={e.continent}
            population={e.population}
            countries={currentCountries} 
            name={e.name} id={e.id} 
            imagen={e.imagen} 
            />)}
        </div>
            <Pagination countriesperpage={countriesperpage} totalCountries={countries.length} paginate={paginate} />
        </div>
        }
      </div>
    </div>
  )
}

export default Home;