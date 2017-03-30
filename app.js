const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
	res.render('index', { title: 'Welcome' });
});

app.get('/about', (req, res, next) => {
	res.render('about');
});

app.get('/contact', (req, res, next) => {
	res.render('contact');
});

app.post('/contact/send', (req, res, next) => {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'myEmail@gmail.com',
			pass: 'myPassword'
		}
	});

	const mailOptions = {
		from: 'Tristan Lobaugh <myEmail@gmail.com>',
		to: 'anotherEmail@gmail.com',
		subject: 'Website Submission',
		text: `You have a submission with the following details... Name: ${req.body.name} | Email: ${req.body.email} | Message: ${req.body.message}`,
		html: `<p>You have a submission with the following details...</p>
					<ul>
						<li>Name: ${req.body.name}</li>
						<li>Email: ${req.body.email}</li>
						<li>Message: ${req.body.message}</li>
					</ul>`
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
			res.redirect('/');
		} else {
			console.log(`Message sent! ${info.response}`);
			res.redirect('/');
		}
	});
});

app.listen(3000);
console.log('Server is running on port 3000...');
