const initialState = {
    countries: [],
    Allcountries: [],
    activities: [],
}

function reducer(state=initialState, {type, payload}){
    switch(type) {

        case "GET_ALL_COUNTRIES":
            return {
                ...state,
                countries: payload,
                Allcountries: payload,
            }
        case "GET_SINGLE_COUNTRY":
                return{
                    ...state,
                    countries: payload
            }

        // Filters:
        case "FILTER_BY_CONTINENT":
            const allCountries = state.Allcountries
            const filter = payload === "All" ? allCountries : allCountries.filter(e => e.continent === payload)
            return{
                ...state,
                countries: filter,
            }
        case "FILTER_BY_NAME":
            const countriesSort = state.countries;
            if(payload === "asc"){
                countriesSort.sort(function(a,b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if (a.name < b.name){
                        return -1
                    }
                    return 0
                })
            }
            if (payload === "desc") {
            countriesSort.sort(function (a,b){
                if(a.name> b.name){
                    return -1;
                }
                if(a.name < b.name){
                    return 1;
                }
                return 0
            })}
            if(payload ==="low"){
                countriesSort.sort(function(a,b){
                    if(a.population>b.population){
                        return 1
                    }
                    if(a.population>b.population){
                        return -1
                    }
                    return 0
                })
            }
            if(payload ==="high"){
                countriesSort.sort(function(a,b){
                    if(a.population>b.population){
                        return -1
                    }
                    if(a.population>b.population){
                        return 1
                    }
                    return 0
                })
            }
            return{
                ...state,
                countries: countriesSort,
            }
            
        case "FILTER_BY_POPULATION":
            let population = state.countries
            const SortPopulation = payload  === "low" ? 
            population.sort(function(a,b){
                if(a.population > b.population){
                    return 1;
                }
                if (a.population < b.population){
                    return -1
                }
                return 0
            }) :
            population.sort(function (a,b){
                if(a.population> b.population){
                    return -1;
                }
                if(a.population < b.population){
                    return 1;
                }
                return 0
            })
            return{
                ...state,
                countries: SortPopulation,
            }
        //End filters

        case "GET_NAME":
            return{
                ...state,
                countries: payload
            }

        //Activities
        case "GET_ALL_ACTIVITIES":
            return {
                ...state,
                activities: payload,
            }
        case "CREATE_ACTIVITY":
            return{
                ...state,
            }
        case "FILTER_BY_ACTIVITY":{
            const CountriesActivities = state.Allcountries
            const filter2  = payload === "All" ? CountriesActivities : 
            CountriesActivities.filter(e => e.activities && e.activities.map(c => c.name).includes(payload))
            return{
                ...state,
                countries : filter2
            }
        }

        case "DELETE_ACTIVIY":
            return{
                ...state, 
                activities: state.activities.filter(e => e.id !== payload)
            }
        default: return state
    }

}

export default reducer;