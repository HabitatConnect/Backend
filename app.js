require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 5000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// static
app.use(express.static('../Frontend/public'));

// templating engine
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('views', '../Frontend/views');
app.set('view engine', 'ejs');

app.set('view engine', 'ejs');

// routes
app.use('/', require('./server/routes/index'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})