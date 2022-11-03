var mysql = require('mysql');

//import 'mysql';

var con = mysql.createConnection({
    host: "129.74.153.235",
    user: "jboueri",
    password: "pwpwpwpw"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});