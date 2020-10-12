import {mongoose} from 'mongoose';
import {Joi} from 'joi';
import {PasswordComplexity} from 'joi-password-complexity';
import {jwt} from 'jsonwebtoken';
import {config} from './../config'

const usuario = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 50,
    maxlength: 50
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

usuario.methods.generateToken = function () {
  const token = jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    isAdmin: this.isAdmin
  },
  config.get("JWT_PRIVATE_KEY")
  )
  return token;
};

export const User = mongoose.model("User", usuario);

export function validateUser(user) {
  const schema = {
  name: Joi.string()
    .regex(/^[a-zA-Z0-9,.'-]+$/)
    .min(5)
    .max(50)
    .required(),
  email: Joi.string()
    .email()
    .min(5)
    .max(255)
    .required(),
  password: Joi.string()
    .min(8)
    .max(255)
    .required()
  };
  let result = Joi.validate(user, schema);
  if (!result["error"]) result = validatePassword(user.password);

  return result;
}
function validatePassword(password) {
  const passComplexitty = {
    min: 8,
    max: 255,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 3
  };
  return Joi.validate(password, new PasswordComplexity(passComplexitty));
}



