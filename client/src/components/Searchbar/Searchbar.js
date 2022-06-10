
import { useDispatch, useSelector } from 'react-redux'
import {filterCountriesByActivity, filterCountriesByContinent, Getinput, OrderByName, OrderByPopulation} from '../../redux/actions'
import {Search,Search__filters, Search__search, OrderCountries} from './Searchbar.module.css'
import icon from '../../assets/search.svg'
import { useState } from 'react'

function Searchbar() {
    const [name,setname] = useState('')
    const ActivitiesStatus = useSelector(state => state.activities)
    const dispatch = useDispatch()

    function handleChange(e){
        e.preventDefault()
        setname(e.target.value)
    }
    function handlesubmit(e){
        e.preventDefault()
        dispatch(Getinput(name))
    }
    //----------FILTERS----------//
    function handleFilterContinent(e){
        dispatch(filterCountriesByContinent(e.target.value))
    }

    function handleFilterActivity(e){
        dispatch(filterCountriesByActivity(e.target.value))
    }

    //----------FILTERS----------//

    //-------ORDER FILTER-------//

    function handleOrder(e){
        dispatch(OrderByName(e.target.value))
    }
    //-------ORDER FILTER-------//
  return (
    <div className={Search}>
        <div>
            {/* Filters */}
            <div className={Search__filters}>
                <label>Filter countries By:</label>
                <select onChange={e => handleFilterContinent(e)}>
                    <option selected disabled value= "">Continent</option>
                    <option value="All">All continents</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Oceania">Oceania</option>
                </select>
                {
                ActivitiesStatus.length>0 ?
                    <select onChange={e => handleFilterActivity(e)}>
                        <option selected disabled>Activities</option>
                        <option value='All'>All</option>
                   { ActivitiesStatus.map(e =>
                        <option key={e.id} value={e.name}>
                            {e.name}
                        </option>
                        )}
                    </select>
                    : 
                <select><option selected disabled>No activities found</option></select>
                }
            </div>
            {/* Searchbar */}
            <div className={Search__search}>
                <input placeholder='Find country or continent...' onChange={e => handleChange(e)}></input>
                <button type='submit' onClick={(e) => handlesubmit(e)}><img src={icon} alt='search'/></button>
            </div>
        </div>
        <div>
        {/* Order filter */}
            <div className={OrderCountries}>
                <label>Order countries By:</label>
                <select onChange={e => handleOrder(e)}>
                        <option selected disabled value=" ">Select One</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                        <option value="low">Population: low to high</option>
                        <option value="high">Population: high to low</option>
                    </select>
            </div>
        </div>
    </div>
    )
}

export default Searchbar