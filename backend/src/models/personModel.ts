import mongoose from 'mongoose'

const personSchema = new mongoose.Schema(
  {
    date_range: [
      {
        type: String,
        required: false,
        trim: true
      }
    ],
    surname: {
      type: String,
      required: true,
      unique: false,
      trim: true
    },
    firstname: {
      type: String,
      required: false,
      trim: true
    },
    prefix: {
      type: String,
      required: false,
      trim: true
    },
    pen_name: {
      type: String,
      required: false,
      trim: true
    },
    dob: {
      type: String,
      required: false,
      trim: true
    },
    dod: {
      type: String,
      required: false,
      trim: true
    },
    position: {
      type: String,
      required: false,
      trim: true
    },
    address: {
      type: String,
      required: false,
      trim: true
    },
    neighborhood: {
      type: String,
      required: false,
      trim: true
    },
    city: {
      type: String,
      required: false,
      trim: true
    },
    post_code: {
      type: String,
      required: false,
      trim: true
    },
    proposer: {
      type: String,
      required: false,
      trim: true
    },
    orgs: [
      {
        type: String,
        required: false,
        trim: true
      }
    ],
    periodicals: {
      type: String,
      required: false,
      trim: true
    },
    sources: {
      type: String,
      required: false,
      trim: true
    },
    other: {
      type: String,
      required: false,
      trim: true
    },
    joined: {
      type: String,
      required: false,
      trim: true
    }
  },
  {
    timestamps: true,
    collection: 'people'
  }
)

const Person = mongoose.model('Person', personSchema)
export default Person
