const xsenv = require("@sap/xsenv");
const Client = require('pg').Client;

async function createDBConnection() {
    let pgCredentials;

    try {
        pgCredentials = xsenv.cfServiceCredentials({ tag: 'postgresql' });
    } catch (err) {
        throw new Error('[DB] Unable to find Postgres service credentials in environment');
    }
      
    const client = new Client(pgCredentials.uri);
    await client.connect(function (error) {
        if (error) {
            console.error('connection error', error.stack);
        }
        else {
            console.log('connected to postgres');
        }
    });

    return client;
}

module.exports = () => createDBConnection;