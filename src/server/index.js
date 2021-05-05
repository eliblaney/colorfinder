require('dotenv').config({ path: '.env' })

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const admin = require('firebase-admin')
const fileUpload = require('express-fileupload')
const vision = require('@google-cloud/vision');
const serviceAccount = require('./serviceAccountKey.json')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
if(process.env.DEVELOPMENT === '1') {
	app.use(cors());
}
app.use(bodyParser.json());
app.use(fileUpload({
	createParentPath: true,
}))
app.use(express.static(path.join(__dirname, '../../build')))
app.use(express.static(path.join(__dirname, '../../public')))

app.post('/colors', async (req, res) => {
	if(req.files) {
		const file = req.files.file
		const ext = path.extname(file.name).toLowerCase()
		if (['.png','.jpg','.jpeg','.heic'].includes(ext)) {
			const filename = '/uploads/' + uuidv4() + ext
			const filePath = path.join(__dirname, '../../public' + filename)
			file.mv(filePath, async () => {
				const client = new vision.ImageAnnotatorClient();
				const [result] = await client.imageProperties(filePath);
				const colors = result.imagePropertiesAnnotation.dominantColors.colors;
				res.send({success: true, colors: colors, image: filename});
			});
		} else {
			fs.unlink(file.tempFilePath, err => {
				res.send({success: false, error: "Illegal file type"})
			})
		}
	} else {
		res.send({success: false, error: "File upload required"});
	}
})

const database = new Sequelize({
	dialect: 'sqlite',
	storage: './db.sqlite',
});

const Palatte = database.define('palatte', {
	user: Sequelize.STRING,
	colors: Sequelize.JSON,
});

const auth = async (req, res, next) => {
	const authToken = req.headers.authtoken
	if(authToken) {
		try {
			req.user = await admin.auth().verifyIdToken(authToken)
			next()
		} catch(e) {
			res.send({success: false, error: "Not authorized"})
		}
	} else {
		res.send({success: false, error: "Not logged in"})
	}
}
app.use('/palattes', auth)
app.get('/palattes', async (req, res) => {
	if(!req.user) {
		res.send({success: false, error: "Not logged in"})
	}
	const palattes = await Palatte.findAll({
		where: {
			user: req.user.email,
		},
		order: [
			['id', 'DESC'],
		]
	})
	res.send(palattes)
})
app.post('/palattes', async (req, res) => {
	if(!req.user) {
		res.send({success: false, error: "Not logged in"})
	}
	await Palatte.create({
		user: req.user.email,
		colors: JSON.parse(req.body.colors)
	})
	res.send({success: true})
})

const port = process.env.SERVER_PORT || 3001;

database.sync().then(() => {
	app.listen(port, () => {
		console.log(`Development mode: ${process.env.DEVELOPMENT === '1'}`)
		console.log(`Listening on port ${port}`);
	});
});
