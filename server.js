//import and config server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;
const cors = require('cors');
const path = require('path');
const groceries = require('./routes/groceries');

//middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next();
});

app.use('/', express.static(path.join(__dirname, '../build')));

//routes
app.use('/groceries', groceries);

//start server
app.listen(PORT, () => {
	console.log(`server listens on port ${PORT}`);
});