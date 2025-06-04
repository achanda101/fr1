const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const url = require('url');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/', require('./controller'));

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});