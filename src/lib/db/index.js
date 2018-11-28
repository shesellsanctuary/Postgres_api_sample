const app = require('express')();
const bodyParser = require('body-parser');
const load = require('consign');
const liquibase = require('liquibase');
const xsenv = require("@sap/xsenv");

let pgCredentials;

    try {
        pgCredentials = xsenv.cfServiceCredentials({ tag: 'postgresql' });
    } catch (err) {
        throw new Error('[DB] Unable to find Postgres service credentials in environment');
    }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

liquibase({
    changeLogFile: 'src/lib/db/dbChangeLog.sql',
    url: pgCredentials.uri,
    username: pgCredentials.username,
    password: pgCredentials.password
  })
  .run('update')
  .then(() => console.log('Update DB Success'))
  .catch((err) => console.log('Update DB Fail', err));

load()
    .include('/lib/db/database')
    .then('/lib/db/routes')
    .into(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));