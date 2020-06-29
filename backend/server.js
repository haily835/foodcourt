const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // connect to mongoDB
const pdf = require('html-pdf'); // export to pdf
const bodyParser = require('body-parser');
const pdfTemplate = require('./pdfStructure'); // structure of the pdf, how it will be printed


// require this to have the environment variables in .env file
require('dotenv').config();


// create express server 
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // allow us to parse json


// the mongoDB link which we have to get from atlas
// ATLAS_URI environment variable in .env file
const uri = process.env.URI; // database stored 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

// once the connection is open log message 
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// tell the server to use the API that created
// require
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const staffRouter = require('./routes/staff');

// pdf handling
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

// end pdf handling

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

// and use
// everytime use root/exercises
app.use('/items', itemsRouter);
// everytime use root/users
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/staff', staffRouter);



// start server, start to listening on a certain ports
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});