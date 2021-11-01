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
  const flight = new Flight (req.body)
  flight.save(function(err) {
    if (err) {
      return res.redirect("/flights/new")
    }
    res.redirect("/flights")
  })
}


export {
  index,
  newFlight as new,
  create
}
