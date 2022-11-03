var mysql = require('mysql2');
var Client = require('ssh2').Client;
var ssh = new Client();

var db = new Promise(function (resolve, reject) {
    ssh.on('ready', function () {
        ssh.forwardOut(
            // source address, this can usually be any valid address
            '127.0.0.1',
            // source port, this can be any valid port number
            12345,
            // destination address (localhost here refers to the SSH server)
            '129.74.153.235',
            // destination port
            3306,
            function (err, stream) {
                if (err) throw err; // SSH error: can also send error in promise ex. reject(err)
                // use `sql` connection as usual
                connection = mysql.createConnection({
                    host: '129.74.153.235',
                    user: 'jboueri',
                    password: 'pwpwpwpw',
                    database: 'jboueri',
                    stream: stream
                });

                // send connection back in variable depending on success or not
                connection.connect(function (err) {
                    if (!err) {
                        resolve(connection);
                    } else {
                        reject(err);
                    }
                });
            });
    }).connect({
        host: '129.74.153.235',
        port: '',
        username: '',
        password: ''
    });
});

module.exports = db;