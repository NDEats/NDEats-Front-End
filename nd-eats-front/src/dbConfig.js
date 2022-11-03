// dbConfig.js

const mysql = require('mysql2');
const { Client } = require('ssh2');
// create an instance of SSH Client
const sshClient = new Client();

// define connection config for the database
const dbServer = {
    host: "129.74.153.235",
    port: "3306",
    user: "jboueri",
    password: "pwpwpwpw",
    database: "jboueri"
}
// define connection config for the ssh tunnel
const tunnelConfig = {
    host: "db8.cse.nd.edu",
    port: 22,
    username: "",
    password: ""
}

const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: dbServer.host,
    dstPort: dbServer.port
};

const SSHConnection = new Promise((resolve, reject) => {
    sshClient.on('ready', () => {
        sshClient.forwardOut(
            forwardConfig.srcHost,
            forwardConfig.srcPort,
            forwardConfig.dstHost,
            forwardConfig.dstPort,
            (err, stream) => {
                if (err) reject(err);

                // create a new DB server object including stream
                const updatedDbServer = {
                    ...dbServer,
                    stream
                };
                // connect to mysql
                const connection = mysql.createConnection(updatedDbServer);
                // check for successful connection
                //  resolve or reject the Promise accordingly          
                connection.connect((error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(connection);
                });
            });
    }).connect(tunnelConfig);
});