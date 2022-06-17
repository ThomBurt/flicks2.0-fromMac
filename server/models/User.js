const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');
//const Experience = require('./Experience');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    images: {
      type: Array,
      default: [
          {
              url: 'https://via.placeholder.com/200x200.png?text=Profile',
              public_id: Date.now
          }
      ]
  },

    headline: {
      type: String
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    //experiences: [Experience.schema],
    experiences: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Experience'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};


userSchema.virtual("experienceCount").get(function() {
  return this.experiences.length;
});


const User = model('User', userSchema);

module.exports = User;