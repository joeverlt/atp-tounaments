import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    code: String,
    name: String,
    date: Date,
    location: String,
    winner: String,
    winnerId: String
  },
  { timestamps: true }
)

export default model('Tournament', schema)
