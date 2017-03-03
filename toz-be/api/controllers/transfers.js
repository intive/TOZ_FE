'use strict';

var util = require('util');

function transfer(req, res) {
  var body = req.swagger.params.transfer.value,
    receiver = body.receiver,
    amount = body.amount,
    currency = body.currency,
    description = body.description;

  if(!receiver || !amount || !currency) {
    return res.status(400).json({
      message: "Validation error!"
    });
  }

  if(amount > 1000) {
    return res.status(400).json({
      message: "Amount to big!"
    });
  }

  res.json({
    message: amount + " " + currency + " transfered to " + receiver
  });
}

module.exports = {
  transfer: transfer
};
