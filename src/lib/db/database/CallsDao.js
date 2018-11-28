class CallsDao {
    
    constructor(connection) {
        this._connection = connection;
    }

    getAll() {
        return this._connection.query('SELECT * FROM apiCalls;').then((res) => {
            return res.rows;
        });
    }

    getById(id) {
        return this._connection.query(`SELECT * FROM apiCalls WHERE id=${id};`).then((res) => {
            return res.rows;
        });
    }

    post(call) {
        return this._connection.query(`INSERT INTO apiCalls(service, tenant, timestamp, numberOfCall) VALUES ('${call.service}', '${call.tenant}', '${call.timestamp}', ${call.numberofcall});`);
    }

    delete(id) {
        return this._connection.query(`DELETE FROM apiCalls WHERE id = ${id};`);
    }

    put(id, call) {
        return this._connection.query(`UPDATE apiCalls SET service = '${call.service}' where id = ${id};`);
    }

    initTable() {	
        let createTableText = `	
            CREATE TABLE IF NOT EXISTS apiCalls(
                id BIGSERIAL,
                service TEXT,
                tenant TEXT,
                timestamp TIMESTAMP,
                numberOfCall BIGINT,
                sentToMaas BOOLEAN DEFAULT false
                );`
	
            return this._connection.query(createTableText);	
    }
}

module.exports = () => CallsDao;