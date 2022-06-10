const axios = require('axios')
const { Country, Activities } = require('../db')


// get all countries from api and map: 
const getAllCountries = async() =>{
    let countries = ( await axios('https://restcountries.com/v3/all')).data.map(c =>({
            key: c.cca3,
            name: c.name.common,
            imagen: c.flags[0],
            continent: c.continents?.toString(),
            subregion: c.subregion,
            capital: c.capital?.[0],
            area: c.area,
            population: c.population,
            googleMaps: c.maps.googleMaps,
        }));
    return countries;
        
}

// Get all countries from api to db
const GetCountriesdb = async () =>{
    let countries = await getAllCountries();
    countries.map (e => (
        Country.findOrCreate({
         where: {name: e.name},
         defaults:{
             key: e.key,
             imagen: e.imagen,
             continent: e.continent,
             subregion: e.subregion,
             capital: e.capital,
             area: e.area,
             population: e.population,
             googleMaps: e.googleMaps
         }
     })))
}

const getCountries =  () =>{
    return  Country.findAll({
        include:{
            model: Activities,
            attributes:[],
            through: {
                attributes: [],
            }
        }
    })
}

//Getting activities from DB
const activitiesFromDB = async () =>{
    return await Activities.findAll();
}   

module.exports ={
    getAllCountries,
    GetCountriesdb,
    activitiesFromDB,
    getCountries
}