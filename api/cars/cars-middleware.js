const Cars = require('./cars-model')
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const car = await Cars.getById(req.params.id)
  if (car.length === 0){
    let message = `car with id ${req.params.id} is not found`
    res.status(404).json({message})
  }
  next()
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage, title, transmission } =req.body
  if (!vin){
    res.status(400).json({ message: "vin is missing" })
  } else if (!make){
    res.status(400).json({ message: "make is missing" })
  } else if(!model) {
    res.status(400).json({ message: "model is missing" })
  } else if(!mileage){
    res.status(400).json({ message: "mileage is missing" })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const isVinValid = vinValidator.validate(req.body.vin)
  if (!isVinValid){
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const allCars = await Cars.getAll();
  for (let i=0; i < allCars.length; i++){
    if (allCars[i].vin === req.body.vin){
      res.status(400).json({message: `vin ${req.body.vin} already exists`})
    }
  }
  next()
}

module.exports={
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
