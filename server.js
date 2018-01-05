// Load Environment Variables if necessary
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Require all dependencies
var express = require('express');
var app = express();
var logger = require('morgan');
var stylus = require('stylus');
var nib = require('nib');

// Get routes
const routes = require('./routes');

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

// Use public folder to serve all static files
const publicFolderPath = __dirname + '/public';
app.use(express.static( publicFolderPath ));

// Set middleware location to public folder
app.use(
  stylus.middleware(
    {
      src: publicFolderPath,
      compile: compile
    }
  )
);

// Connect all routes to the application
app.use('/', routes);

// Start up the server
app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000));
});
