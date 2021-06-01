const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.status(202);
  res.json({
    message: 'Working',
  });
  console.log(req.body);
});

module.exports = router;
