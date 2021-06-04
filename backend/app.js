// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

const users = require('./routes/api/users');
const admins = require('./routes/api/admins')
const solicitations = require('./routes/api/solicitations');
const reports = require('./routes/api/reports');
const cookieParser = require("cookie-parser");
require('dotenv').config();


const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/users', users);
app.use('/api/admin', admins);
app.use('/api/solicitations', solicitations);
app.use('/api/reports/', reports);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));