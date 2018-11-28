module.exports = (app) => {
    app.get('/api/calls/', async (req, res) => {
        let connection = await app.lib.db.database.connectionFactory();
        let callsDao = new app.lib.db.database.CallsDao(connection);

        await callsDao.getAll().then((content) => res.send(content)).catch((err) => res.send(400, "Error getting table. " + err));
        connection.end();
    });

    app.get('/api/calls/:id', async (req, res) => {
        let connection = await app.lib.db.database.connectionFactory();
        let callsDao = new app.lib.db.database.CallsDao(connection);

        await callsDao.getById(req.params.id).then((content) => res.send(content)).catch((err) => res.send(400, "Error getting call. " + err));
        connection.end()
    });

    app.post('/api/calls/', async (req, res) => {
        let connection = await app.lib.db.database.connectionFactory();
        let callsDao = new app.lib.db.database.CallsDao(connection);

        let call = req.body;
        await callsDao.post(call).then(() => {
            console.log("Post SUCCESS");
            res.send(200, call);
        }).catch((err) => {
            console.error("Post FAILURE", err);
            res.send(400, err);
            connection.end();
        })
    });

    app.delete('/api/calls/:id', async (req, res) => {
        let connection = await app.lib.db.database.connectionFactory();
        let callsDao = new app.lib.db.database.CallsDao(connection);

        await callsDao.delete(req.params.id).then(() => {
            res.send(200, 'Successfully deleted');
        }).catch((err) => res.send(400, "Error deleting call. " + err));

        connection.end();
    });

    app.put('/api/calls/:id', async (req, res) => {
        let connection = await app.lib.db.database.connectionFactory();
        let callsDao = new app.lib.db.database.CallsDao(connection);

        let callId = req.params.id;
        let call = req.body;
        await callsDao.put(callId, call).then(()=> {
            res.send(200, call);
        }).catch((err) => res.send(400, "Error updating call. " + err));

        connection.end();
    });

    app.get('/initDb', async (req, res) => {	
        let connection = await app.lib.db.database.connectionFactory();	
        let callsDao = new app.lib.db.database.CallsDao(connection);	
	
        await callsDao.initTable().then(() => res.send(200, "Table created.")).catch(() => res.send(400, "Error creating table."));	
     
        connection.end();
    });

    return this;
}