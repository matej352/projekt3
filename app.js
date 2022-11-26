const express = require('express');
const https = require("https");
const path = require('path');
const dotenv = require('dotenv');
var fs = require('fs');

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const PORT = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 3000;

dotenv.config();

const app = express();

app.set('view engine', 'html');
app.set('views', path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {

	res.sendFile(path.join(__dirname, '/views/home.html'));
});


if (externalUrl) {
	const hostname = '127.0.0.1';
	app.listen(PORT, hostname, () => {
		console.log(`Server locally running at http://${hostname}:${PORT}/ and from
	outside on ${externalUrl}`);
	});
} else {
	https.createServer({
		key: fs.readFileSync('server.key'),
		cert: fs.readFileSync('server.cert')
	}, app)
		.listen(PORT, function () {
			console.log(`Server running at https://localhost:${PORT}/`);
		});
}