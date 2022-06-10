import axios from 'axios'

//countries:
export function getAllCountries(){
    return async (dispatch)=>{ 
        return axios.get(`/countries`)
        .then(res => dispatch({type: "GET_ALL_COUNTRIES", payload: res.data}))
    }
}

export function getSingleCountry(id){
    return async (dispatch)=>{
        return axios.get(`/countries/${id}`)
        .then(res => dispatch({type: "GET_SINGLE_COUNTRY", payload: res.data}))
    }
}

//Search:
export function Getinput(name){
    return async (dispatch) =>{
        return await axios.get(`/countries?name=` + name)
        .then(res => dispatch({
            type: "GET_NAME",
            payload: res.data
        }))
        .catch(error => {
            alert("Country/Continent not found");
            console.log(error);
        })
    }
}

// Countries Filters:
export function filterCountriesByContinent(payload){
        return {
            type: "FILTER_BY_CONTINENT",
            payload
        }
}

export function OrderByName(payload){
    return{
        type: "FILTER_BY_NAME",
        payload
    }
}

export function OrderByPopulation(payload){
    return{
        type: "FILTER_BY_POPULATION",
        payload
    }
}

//activities: 

export function getAllActivities(){
    return async (dispatch)=>{ 
        return axios.get(`/activities`)
        .then(res => dispatch({type: "GET_ALL_ACTIVITIES", payload: res.data}))
    }
}

export function createActivity(payload){
    return async function (dispatch){
        const data = await axios.post("/activities",payload)
        return data;
    }
}
// Filter Activity:
export function filterCountriesByActivity(payload){
    return {
        type: "FILTER_BY_ACTIVITY",
        payload
    }
}


 export function deleteActivity(payload) { 
    return async (dispatch) => {
         return axios.delete(`/activities/delete/` + payload)
        .then(res => dispatch({
            type: "DELETE_ACTIVITY", 
         }))
   }
  }