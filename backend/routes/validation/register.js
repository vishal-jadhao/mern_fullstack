const validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Check for the rules
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be greater than 2 and less than 30 characters";
  }

  // Check for isEmpty
  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password =
      "Password must be greater than 6 and less than 30 characters";
  }

  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Password and Confirm Password must be same";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
