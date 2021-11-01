import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema ({
  seat: {type: String, match: /[A-F][1-9]\d?/},
  price: {type: Number, min: 0},
})

const flightSchema = new Schema ({
  airline: String, //enum
    enum: ["American", "Southwest", "United"],
  airport: String, //enum
    enum:["AUS", "DFW", "DEN", "LAX", "SAN"],
  flightNo: {type: Number, min: 10, max: 9999},
  departs: {type: Date, default: Date.now},
  tickets: [ticketSchema],
})

const Flight = mongoose.model("Flight", flightSchema)

export {
  Flight
}
