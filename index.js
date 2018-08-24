const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL = 'SELECT * FROM persons';

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'Apex',
    password: 'apex1234',
    database: 'express_proto'
});

dbConn.connect(err => {
    if (err) {
        return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('nothing');
});

app.get('/user/del', (req, res) => {
    const { id } = req.query;
    const DELETE_USER = `DELETE FROM persons WHERE id='${id}'`;
    dbConn.query(DELETE_USER, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.send('delete success');
        }
    });
});

app.get('/user/add', (req, res) => {
    const { name, age } = req.query;
    const INSERT_USER = `INSERT INTO persons(name, age) VALUES('${name}', ${age})`;
    dbConn.query(INSERT_USER, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.send('add success');
        }
    });
});

app.get('/user', (req, res) => {
    dbConn.query(SELECT_ALL, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            });
        }
    });
});

app.listen(3500, () => {
    console.log('server start');
});