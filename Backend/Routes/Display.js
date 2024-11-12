const express = require('express');
const router = express.Router();

router.post('/Datafood', (req, res) => {
  try {
    //console.log(global.Fooditem); 
    res.send([global.Fooditem,global.Foodcat]);
  } catch (error) {
    console.error(error.message); 
    res.status(500).send(["Not found"]); 
  }
});

module.exports = router;
