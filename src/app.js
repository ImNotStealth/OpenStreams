const express = require("express");
const app = express();
const session = require('express-session');
const PORT = 5050;

/* 
    Static Folders
*/
app.use(express.static('public'));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));

/* 
    Set up Pages
*/
app.set('views', './src/views');
app.set('view engine', 'ejs');

/*
    Routes
*/
const loginRouter = require('../src/routes/login');
const noPageRouter = require('../src/routes/404');

app.listen(PORT, () => {
    console.log(`OpenStreams is now running on port http://localhost:${PORT}`);
})

app.use('/', loginRouter);
app.use(noPageRouter);