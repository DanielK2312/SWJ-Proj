const mongoose = require('mongoose');

const personSchema = mongoose.Schema(
  {
    surname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: false,
      trim: true,
    },
    prefix: {
      type: String,
      required: false,
      trim: true,
    },
    pen_name: {
      type: String,
      required: false,
      trim: true,
    },
    dob: {
      type: String,
      required: false,
      trim: true,
    },
    dod: {
      type: String,
      required: false,
      trim: true,
    },
    position: {
      type: String,
      required: false,
      trim: true,
    },
    orgs: [
      {
        type: String,
        required: false,
        trim: true,
      },
    ],
    address: {
      type: String,
      required: false,
      trim: true,
    },
    neighborhood: {
      type: String,
      required: false,
      trim: true,
    },
    city: {
      type: String,
      required: false,
      trim: true,
    },
    post_code: {
      type: String,
      required: false,
      trim: true,
    },
    proposer: {
      type: String,
      required: false,
      trim: true,
    },
    periodicals: {
      type: String,
      required: false,
      trim: true,
    },
    other: {
      type: String,
      required: false,
      trim: true,
    },
    joined: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Check if name is taken
 * @param {string} name - The person's name
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
personSchema.statics.isNameTaken = async function (name, excludeUserId) {
  const user = await this.findOne({ name, _id: { $ne: excludeUserId } });
  return !!user;
};

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
