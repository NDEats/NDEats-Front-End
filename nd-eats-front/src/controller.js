var database = require('./db');

module.exports.getCats = function (req, res) {
    // async connection to database
    database().then(function (connection) {
        // query database 
        connection.query('SELECT * FROM `testing_person`', function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            res.send(results);
        });
    });
};