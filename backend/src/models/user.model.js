const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    name: {
      type: String,
      required: false,
      trim: true,
      validate(value) {
        if (!validator.isAlpha(value, ' ')) {
          throw new Error('Not a valid name, sorry.');
        }
      },
    },
    role: {
      type: String,
      required: false,
      trim: true,
      validate(value) {
        if (!value.equals('ADMIN') || !value.equals('EDITOR')) {
          throw new Error('Role is not valid.');
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Hashes password when user object is saved into database
 */
userSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 8);
  user.password = hash;
  next();
});

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
