const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
	console.log('Hello World!');
	res.send('Hello World!');
});

app.listen(3000);
console.log('Server is running on port 3000...');
