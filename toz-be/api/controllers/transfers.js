'use strict';

var util = require('util');

function transfer(req, res) {
  res.json({
    receiver: {
      name: "Towarzystwo Opieki nad Zwierzętami",
      address1: "ul. Ojca Beyzyma 17",
      address2: "70-001 Szczecin"
    },
    account: {
      name: "PKO BO II O/Szczecin",
      number: "63102047950000940201035419"
    }
  });
}

module.exports = {
  transfer: transfer
};
