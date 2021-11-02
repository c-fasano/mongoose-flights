import { Router } from 'express'
import * as flightsCtrl from "../controllers/flights.js"
import { Flight } from "../models/flight.js"
const router = Router()



router.get("/", flightsCtrl.index)

router.get("/new", flightsCtrl.new)

router.get("/:id", flightsCtrl.show)

router.post("/", flightsCtrl.create)

export {
  router
}
