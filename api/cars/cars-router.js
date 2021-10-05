// DO YOUR MAGIC

const express = require('express');
const router = express.Router();
const Cars = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware');

router.get('/', async (req,res,next)=>{
    try {
        const allCars = await Cars.getAll()
        res.json(allCars)
    } catch (err){
        res.send(err)
    }
})

router.get('/:id', checkCarId, async(req, res, next)=>{
    try {
        const car = await Cars.getById(req.params.id)
        res.json(car[0])
    } catch (err){
        res.send(err)
    }
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async(req,res,next)=>{
    try{
        const createdCar = await Cars.create(req.body)
        res.json(createdCar[0])
    }catch (err){
        res.send(err)
    }
})

module.exports = router;