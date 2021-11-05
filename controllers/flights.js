import { Destination } from "../models/destination.js"
import { Flight } from "../models/flight.js"

function index(req, res) {
  console.log("Viewing all flights")
  Flight.find({}, function(error, flights) {
    res.render("flights/index",  {
      flights, title: "All Flights"
    })
  })
}

function newFlight(req, res) {
  console.log("Adding Flight")
  res.render("flights/new", {
    title: "Add FLight"
  })
}

function create (req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }  
  const flight = new Flight (req.body)
  flight.save(function(error) {
    if (error) {
      return res.redirect("/flights/new")
    }
    res.redirect("/flights")
  })
}

function show (req, res) {
  Flight.findById(req.params.id)
  .populate("destinations")
  .exec(function(error, flight) {
    Destination.find({_id: {$nin: flight.destinations}}, 
      function(error, destinations) {
        res.render("flights/show", {
          title: `Flight No: ${flight.flightNo}`,
          flight: flight,
          destinations,
          error
        })
      })
  })
}

function createTicket (req, res) {
  console.log("Creating ticket associated with", req.params.id)
  // console.log(req.body)
  Flight.findById(req.params.id, function(error, flight) {
    flight.tickets.push(req.body)
    flight.save(function(error) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function addDestination (req, res) {
  Flight.findById(req.params.id, function(error, flight) {
    flight.destinations.push(req.body.destinationId)
    flight.save(function (error) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  createTicket,
  addDestination
}
