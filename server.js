// Require all dependencies
var express = require('express');
var logger = require('morgan');
var app = express();

// Add logging and static middleware to express
app.use(logger('dev'));

// Set up the template engine
app.set('views', './views');
app.set('view engine', 'pug');

// GET response for '/'
app.get('/', function(req, res, next) {

  try {
    // Render the 'index' template, and pass in a few variables
    res.render('index', {
      title: 'Home Page',
      message: 'Welcome to Manchester United Home Page!'
    });

  }
  catch (e) {
    // If there are any errors, send them off the the logger
    next(e);
  }

});

// Start up the server
app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000));
});
