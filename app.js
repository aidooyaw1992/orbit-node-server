const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');
const attendeesRoute = require('./src/routes/attendeesRoute');
const ownersRoute = require('./src/routes/ownersRoute');
const authRoute = require('./src/routes/authentication');
const eventsRoute = require('./src/routes/eventsRoute');
const paymentsRoute = require('./src/routes/paymentsRoute');
const locationsRoute = require('./src/routes/locationsRoute');

const app = express();

//load handlebars
app.engine('hbs', hbs({
    extname:'hbs',
    defaultLayout:'layout',
    layoutsDir: __dirname+ '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

//load app Midlleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//load routes
app.use('/api/attendees', attendeesRoute);
app.use('/api/owners', ownersRoute);
app.use('/api/events', eventsRoute);
app.use('/api/payments', paymentsRoute);
app.use('/api/locations', locationsRoute);
app.use('/api/auth', authRoute);
//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));