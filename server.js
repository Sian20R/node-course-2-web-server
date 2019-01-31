const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err)
            console.log('Unable to append to server log');
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintanence.hbs', {
//         pageTitle: 'Maintanence Page'
//     });
// });

app.use(express.static(__dirname + '/public'));      //express.static (take the absolute path of the folder that you want to serve)


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear().toString();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Setting the routes
app.get('/', (req, res) => {
    //res.send('Hello Express');

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello, I am Seaw Ker Boon and live in Singapore'
    });
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle this request'
    })
})

// To bind the port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})


///Users/admin/Desktop/OneDrive - Singapore Institute Of Technology/Practice/Nodejs/Udemy/Tutorials/Section_5/node-web-server