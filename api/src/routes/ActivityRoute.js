const { Router } = require('express');
const express = require('express');
const { activitiesFromDB } = require('../Controller/DataController');
const {Activities, Country} = require('../db');
const router = Router();

// Get all activities from db: 
router.get('/', async (req,res) =>{
    try { 
       const activities = await Activities.findAll({
            include: {
                model: Country,
                atributes: [  "name", "capital","continent","subregion", "id"],
                through:{
                atributes:[]
                }
            }
       })
       if(!activities.length){
          return  res.send([])
       }
        res.send(activities)
    } catch (error) {
        res.send(error)
    }
})

// Create an activitie on database 
router.post('/', async (req,res) =>{
    try {
        const { name, difficulty, duration, season, image, country } = req.body; 
        const newActivity = await Activities.create({
             name: name,
             difficulty: difficulty ,
             duration: duration,
             season: season,
             image : image,
        });
        const ActivitiePerCountry = await Country.findAll({
            where:{
                name: country
            }
        })
        await newActivity.addCountry(ActivitiePerCountry);
        res.status(200).send('Activity created successfully')
    } catch (error) {
        res.send(error)
    }
})


// extra: 

//Delete activitie by id: (connected in front by actions in activitie delete route)
router.delete('/delete/:id', (req,res)=> {

    try {
        let ID = req.params.id
        Activities.destroy({
            where: {
                id: ID
            }
        })
        res.send("actividad eliminada")
    } catch (error) {
        
    }
})

// Modify an activitie from db (not connected in front)
router.put('/:id', async(req,res) =>{

    const { name, difficulty, duration, season, country } = req.body; 
    const activitie = await Activities.findAll();

    const id = req.params.id
    if (!id || !name || !difficulty || !duration || !season || !country) {
         return res.status(404).json({message: `No se encuentra actividad solicitada`});
    }
    else{
        let ActivitieFind = activitie.find(e => e.id === parseInt(id))

        if (ActivitieFind){
            ActivitieFind.name = name;
            ActivitieFind.difficulty = difficulty;
            ActivitieFind.season = season;
            ActivitieFind.country = country;
            res.send(ActivitieFind)
        }
        else {
            res.status(404).send("no hay activity")
        }
    }
    
})

// Filter activities by id
router.get('/:id', async (req,res)=>{
    try {
        let activitie = await Activities.findAll();
        const id = req.params.id
        const SigleActivitie = activitie.filter(c => id == c.id)
        
        if (!SigleActivitie.length) {
            return res.status(404).json({message: `No se encuentra actividad solicitada con el id: ${id}`});
        }
        return res.send(SigleActivitie);
    
        } catch (error) {
            next(error)
        }
})

module.exports = router;