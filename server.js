const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname + '/views/partials')

// Set Engine
app.set('view engine', 'hbs');



//Register MiddleWARE
app.use((req, res, next) => {
    //req Everthing that comes from the client

    var now  = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;


    console.log(log);
    //write to filesystem
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// Register Middleware
//app.use((req, res, next) => {
//    res.render('maintance.hbs')
//});

//Register MiddleWARE
app.use(express.static(__dirname + '/public'));

//Helper for Templating
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


//Routing
app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>f');


    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my page'
    });});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error du schmock'
    })
})
app.listen(port, () => {
    console.log(`Server is up on Port ${port}`);
});