const fs = require('fs');
const express = require('express');
const app = express();

//Middleware
app.use(express.json());

const tourDetails = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));

app.get('/tours', (req, res) => {
  //write a code here to get all the tours from tours.json
  res.status(200).json(tourDetails);
});

app.post('/tours', (req, res) => {
  const { name, description, duration, price } = req.body;
  //Write a code here for creating new tour from data/tours.json
  //For creating new id use this logic
  // const newId = tourDetails[tourDetails.length - 1].id + 1;
  newtour={
    id: tourDetails[tourDetails.length - 1].id + 1,
    name,
    description,
    duration,
    price,
  }
  tourDetails.push(newtour);
  fs.writeFileSync(`${__dirname}/data/tours.json`,JSON.stringify(tourDetails));

  res.status(200).json({"message": "Tour added successfully"})
});

app.put('/tours/:id', (req, res) => {
  const tourId = parseInt(req.params.id);
  const updatedTour = req.body;

  //write a code here for updating a tour
  const index=tourDetails.findIndex(({id})=>id==tourId);
  if(index===-1){
    res.status(404).json({msg:"id not found"});
  }
  tourDetails[index]=updatedTour;
  fs.writeFileSync(`${__dirname}/data/tours.json`,JSON.stringify(tourDetails));

  res.status(200).json({"message": "Tour updated successfully"});
});

app.delete('/tours/:id', (req, res) => {
  const tourId = parseInt(req.params.id);
  //Write a code here for deleting a tour from data/tours.json
  const index=tourDetails.findIndex(({id})=>id==tourId);
  if(index===-1){
    res.status(404).json({msg:"id not found"});
  }
  tourDetails.splice(index,1);
  fs.writeFileSync(`${__dirname}/data/tours.json`,JSON.stringify(tourDetails));

  res.status(200).json({"message": "Tour deleted successfully"});

});

module.exports = app;
