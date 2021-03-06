const path = require('path');
const express = require("express"); //express
const dotenv = require("dotenv");   //for global variables creation for ports database stc
const colors = require("colors");   //extra not required for colors in the console
const morgan = require("morgan");   //required for logging
const connectDB = require("./config/db");

dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions');



const app = express();

//body parser
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);


if(process.env.NODE_ENV === 'production' ) {
    app.use(express.static('./client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgYellow.blue.bold));