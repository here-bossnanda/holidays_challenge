const express = require('express');
const path = require('path');
const port = 3000;

const app = express();

const indexRouter = require('./routes/index');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));


app.use(indexRouter);

app.listen(port, () => {
    console.log(`listen to http://localhost:3000`);
})