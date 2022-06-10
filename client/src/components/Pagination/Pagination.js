import React from "react";
import {container, pagination_ul} from './Pagination.module.css'

const pagination = ({countriesperpage, totalCountries, paginate}) => {
    const countriesPage = [];
    for (let i = 1; i <= Math.ceil(totalCountries / countriesperpage); i++){
        countriesPage.push(i);
    }
    return(
        <div className={container}>
        <nav className={pagination_ul}>
            <ul>
                {
                    countriesPage &&  countriesPage.map(n => (
                        <li key={n}>
                           <button  onClick={() => paginate(n)}>{n}</button>
                       </li>
                   )) 
                }
            </ul>
        </nav>
    </div>
    )
}

export default pagination;