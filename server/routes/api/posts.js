const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get
router.get('/', (req, res) => {
    res.send('yo');
});


//add


//delete

module.exports = router;