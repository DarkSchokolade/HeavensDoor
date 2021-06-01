const express = require('express');
const router = express.Router();
const Authorized = require('../models/Authorized');

router.post('/', async (req, res) => {
  //find if rf_tag exist in mongo
  console.log(req.body.rf_tag);
  try {
    const result = await Authorized.findOne({ masterKeyCard: req.body.rf_tag });
    if (result === null) {
      console.log(`Unauthorized`);
      res.sendStatus(401);
    } else {
      console.log(result);
      res.sendStatus(202);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
