const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');

// use layouts before routes
app.use(expressLayouts);

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