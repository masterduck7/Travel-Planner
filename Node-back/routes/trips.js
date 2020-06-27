var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var connection = mysql.createConnection({
    host : 'www.lpsoftware.space',
    user : 'lpsoftwa_masterduck7',
    password : 'PAag#D}nLYMx',
    database : 'lpsoftwa_travel_planner',
    port: '3306'
});

/* GET trips. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * from trips_trip', function (error, results, fields) {
         if(error){
             res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
             //Hay un error a la hora de conectarse a la BBDD
         } else {
             res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
             //Se envian todos los usuarios
         }
    });
});

module.exports = router;