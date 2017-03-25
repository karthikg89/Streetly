const https = require('https');
const express = require('express');
const pg = require('pg');
const pgConString = 'postgres://localhost/streetly';
const bodyParser = require('body-parser');
const app = express();

// Used to serve static content, out of directory static
app.use(express.static('static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// looks up full address in db
app.use('/api/streetLookup', function(req, res) {
	console.log(req.body.full_address);
	pg.connect(pgConString, function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM streets WHERE full_address = $1::text', [req.body.full_address], function(err, result) {
			if (err) {
				return console.error('query failed', err);
			}
			console.log(result.rows);
			res.json(result.rows);
		});
	});
});

app.post('/api/insertAddress', function(req, res) {
	pg.connect(pgConString, function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('INSERT INTO streets VALUES ($1,$2,$3,$4,$5,-1,-1,-1,-1,-1,-1,-1,-1,$6,$7)', [req.body.full_address, req.body.street_number, req.body.street_name, req.body.city, req.body.state, req.body.lat, req.body.lng], function(err, result) {
		if (err) {
			return console.error('query failed', err);
		}
		res.sendStatus(200);
		});
	});
});

app.listen(8080);
