const fs = require('fs');
const express = require('express');


module.exports = function () {
   var router = express.Router();
   router.get('/', function(req,res) {
       console.log('/');
       res.send('<h1>/</h1>');
   });
   return router;
}
