const { body, validationResult } = require('express-validator');
const userValidationRules = () => {
 console.log("Password not acceptable")
  return [
    // password must be at least 6 chars long
    body('password').isLength({ min: 6 })
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  userValidationRules,
  validate
};