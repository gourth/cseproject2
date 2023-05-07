// https://blog.logrocket.com/handle-data-validation-node-js-validatorjs/

const validator = require('../helpers/validate');

const saveTrainer = (req, res, next) => {
  const validationRule = {
    password: 'required|string|min:6'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      console.log(err);
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveTrainer
};