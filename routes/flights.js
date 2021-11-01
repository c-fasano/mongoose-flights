import { Router } from 'express'
import * as flightsCtrl from "../controllers/flights.js"
import { Flight } from "../models/flight.js"
const router = Router()



/* GET users listing. */

router.get("/", flightsCtrl.index)

router.get("/new", flightsCtrl.new)



router.post("/", flightsCtrl.create)

export {
  router
}
