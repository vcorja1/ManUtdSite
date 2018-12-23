// Set up environment variables (unless in production)
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Require all dependencies
const express = require('express');
const app = express();

// Set app name
app.locals.siteName = 'Manchester United Fan Website';

// Compress all responses
const compression = require('compression');
app.use(compression());

// Use Helmet to protect from some well-known web vulnerabilities by setting HTTP headers appropriately
const helmet = require('helmet');
app.use(helmet({
  contentSecurityPolicy: { directives: { defaultSrc: ["'self'"] } },
  referrerPolicy: { policy: 'no-referrer' }
}));

// Add Feature-Policy security header
const featurePolicy = require('feature-policy');
app.use(featurePolicy({
  features: {
    geolocation: ["'none'"],
    midi: ["'none'"],
    notifications: ["'none'"],
    push: ["'none'"],
    syncXhr: ["'none'"],
    microphone: ["'none'"],
    camera: ["'none'"],
    magnetometer: ["'none'"],
    gyroscope: ["'none'"],
    speaker: ["'none'"],
    vibrate: ["'none'"],
    fullscreen: ["'none'"],
    payment: ["'none'"]
  }
}));

// Remove X-Powered-By header
app.use(function(req, res, next) {
  res.removeHeader('X-Powered-By');
  return next();
});

// Use HTTPS enforcer to handle non-encrypted HTTP requests
if(NODE_ENV === 'production') {
  const enforce = require('express-sslify');
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// Use public folder to serve all static files
const publicFolderPath = __dirname + '/public';
app.use(express.static( publicFolderPath ));

// Set up favicon
const favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/img/icons/favicon.ico'));

// Set up the template engine
app.set('views',  __dirname + '/views');
app.set('view engine', 'pug');

// Add stylus for more expressive CSS, and use Nib
const stylus = require('stylus');
const nib = require('nib');
function compile(str, path) {
  return stylus(str)
  .set('filename', path)
  .set('compress', true)
  .use(nib());
}

app.use(
  stylus.middleware(
    {
      src: publicFolderPath,
      compile: compile
    }
  )
);

// Add rate limiter
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 1000,   // 1 second
  max: 500          // Limit each IP to 500 requests per windowMs
});
app.use(limiter);

// Add logging and static middleware to express
const logger = require('morgan');
app.use(logger('dev'));

// Connect all routes to the application
const routes = require('./routes');
app.use('/', routes);

// Start up the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Listening on http://localhost:${PORT}`);
});
