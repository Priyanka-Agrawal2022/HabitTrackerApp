const express = require('express');
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const { urlencoded } = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const { options } = require('./routes');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));

// read through post requests
app.use(express.urlencoded({extended: false}));

// use cookie-parser
app.use(cookieParser());

// use layouts before routes
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes'));

// set up view engine and views
app.set('view engine', 'ejs');
app.set('views', './views');

// set up static files
app.use(express.static('./assets'));

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});