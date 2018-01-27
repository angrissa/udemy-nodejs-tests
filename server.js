const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
	  if (err) { 
	  console.log('Unable to append to the server.log file');
	  };
  });
  
  next();
});

/*
app.use((req, res, next) => {
    res.render('mantain.hbs', {pageTitle: 'Mantenance on the way'});
	});

*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	  return new Date().getFullYear();
	  //return 'Test Year'
	});

hbs.registerHelper('screamIt', (text) => {
if (text) {
  return text.toUpperCase();
 }
})

app.get('/', (req, res) => {

  res.render('home.hbs', {
		pageTitle: 'Home',
//		currentYear: new Date().getFullYear(),
		welcomeMsg: 'This is my home page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
	pageTitle: 'About Page Test'//,
//	currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage : 'Error found'
 });
});

app.listen(3000, () => {
	console.log('Server is up on port 3000')
});