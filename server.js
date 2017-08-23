// Require all dependencies
var express = require('express');
var app = express();
var logger = require('morgan');
var stylus = require('stylus');
var nib = require('nib');

// Set up Stylus, and use Nib
function compile(str, path) {
  return stylus(str)
  .set('filename', path)
	.set('compress', true)
  .use(nib());
}

// Add logging and static middleware to express
app.use(logger('dev'));

// Set up the template engine
app.set('views',  __dirname + '/views');
app.set('view engine', 'pug');

// Set middleware location to public folder
app.use(
  stylus.middleware(
    {
      src: __dirname + '/public',
      compile: compile
    }
  )
);
app.use(express.static(__dirname + '/public'));

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
