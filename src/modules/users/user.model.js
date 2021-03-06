import mongoose, { Schema } from 'mongoose'
import validator from 'validator'

import { hashSync, compareSync } from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

import { passwordReg } from './user.validation'
import constants from '../../config/constants'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email)
      },
      message: '{VALUE} is not valid email'
    }
  },
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
    trim: true
  },
  userName: {
    type: String,
    required: [true, 'username is required'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    trim: true,
    //minLength: [6, 'password needs to be at least 6 characters'],
    validate: {
      validator(password) {
        return passwordReg.test(password)
      },
      message: '{VALUE} is not a valid password'
    }
  }
})

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password)
  }
  return next()
})

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password)
  },
  authenticateUser(password) {
    return compareSync(password, this.password)
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id
      },
      constants.JWT_SECRET,
    )
  },
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      token: `JWT ${this.createToken()}`,
      email: this.email
    }
  }
}

export default mongoose.model('User', UserSchema)
