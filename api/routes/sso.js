const express = require('express');
const router = express.Router();
const Authorized = require('../models/Authorized');
router.post('/', async (req, res) => {
  try {
    const result = await Authorized.findOne({ IOT_ID: req.body.IOT_ID });
    console.log(result);
    if (result != null) {
      // check with MasterKeycard
      if (result.masterKeyCard === req.body.rf_tag) return res.sendStatus(202);
      else {
        const resultFilter = result.whiteList.filter(
          (member) => member._id === req.body.rf_tag
        );
        if (!resultFilter.length) {
          res.sendStatus(401);
        } else {
          res.sendStatus(202);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
