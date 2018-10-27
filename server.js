const express = require('express');
const moment = require('moment');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(err);
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
// app.get('/', (req, res) => {
//     res.render('home.hbs', {
//         pageTitle: 'Home Page',
//         welcomeMessage: 'Welcome to Home Page',
//         currentYear: new Date().getFullYear()
//     })
// });

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
})

// app.get('/api/timestamp/')

const port = process.env.PORT || 3000 ;

app.listen(port, () => {
    console.log('server is up!');
})
