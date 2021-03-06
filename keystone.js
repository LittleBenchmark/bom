// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config({ silent: true });

// Initialise New Relic if an app name and license key exists
if (process.env.NEW_RELIC_APP_NAME && process.env.NEW_RELIC_LICENSE_KEY) {
	require('newrelic');
}

// Require keystone
var keystone = require('keystone');
var pkg = require('./package.json');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

var mongo_url = process.env.MONGO_URI;

if (process.env.ENVIRONMENT === 'local') {
	if(process.env.USE_LIVE_DB === 'true') {
		mongo_url = process.env.MONGO_URI;
	} else {
		mongo_url = 'mongodb://localhost/' + pkg.name;
	}
}

keystone.init({
	'name': 'Bill of Materials by Little Benchmark',
	'brand': 'Little Benchmark',

	'favicon': 'public/favicon.ico',

	'less': 'public',
	'static': 'public',

	'admin path': 'admin',

	'views': 'templates/views',
	'view engine': 'pug',

	'logger': ':method :url :status :response-time ms',

	'emails': 'templates/emails',
	'email transport': 'mailgun',
	'contactEmailAddress': 'team@littlebenchmark.com',

	// 'mandrill username': process.env.MANDRILL_USERNAME,
	// 'mandrill api key': process.env.MANDRILL_KEY,

	'auto update': true,

	'mongo': mongo_url,

	'session': true,
	'session store': 'mongo',
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'littlebenchmark',

	'google api key': process.env.GOOGLE_BROWSER_KEY,
	'google server api key': process.env.GOOGLE_SERVER_KEY,

	'ga property': process.env.GA_PROPERTY,
	'ga domain': process.env.GA_DOMAIN,

	'cloudinary config': process.env.CLOUDINARY_URL,

	'signin logo': ['/images/logo_signin.svg', 120],

	's3 config': {
		bucket: process.env.AMAZON_BUCKET,
		key: process.env.AMAZON_KEY,
		secret: process.env.AMAZON_SECRET
	},

	'embedly api key': process.env.EMBEDLY_API_KEY,
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.
keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7',
		},
	},
});

// Load your project's email test routes
keystone.set('email tests', require('./routes/emails'));

keystone.set('hostName',
	(function() {
		if (keystone.get('env') === 'staging') return 'https://little-benchmark-bom.herokuapp.com/';
		if (keystone.get('env') === 'production') return 'http://bom.littlebenchmark.com';
		return 'http://localhost:' + (keystone.get('port') || '3000');
	})()
);

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	// posts: ['posts', 'post-categories'],
	// enquiries: 'enquiries',
	"bill of materials": ['boms','bom-categories', 'bom-parts'],
	"parts": ['parts', 'part-categories', 'part-subcategories', 'part-suppliers', 'part-manufacturers', 'part-datasheets', 'part-types', 'part-mounting-types', 'part-package-types'],
	"suppliers": ['suppliers', 'supplier-categories'],
	"manufacturers": ['manufacturers', 'manufacturer-categories'],
	users: 'users',
});

// Configure a route for normal users after signin.
// Keeps them from being dumped into the Keystone Admin area.
// See https://github.com/keystonejs/keystone/issues/1489
keystone.set('signin redirect', function(user, req, res){
  var url = (user.isAdmin) ? '/keystone' : '/dashboard';
  res.redirect(url);
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
