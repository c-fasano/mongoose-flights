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
  flight.save(function(err) {
    if (err) {
      return res.redirect("/flights/new")
    }
    res.redirect("/flights")
  })
}

function show(req, res) {
  Flight.findById(req.params.id, function(error, flight) {
    res.render("flights/show", {
      flight, error, title: "Flight Details"
    })
  })
}

export {
  index,
  newFlight as new,
  create,
  show
}
