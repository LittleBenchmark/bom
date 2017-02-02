/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', function (req, res, next) {
	res.locals.siteName = keystone.get('name');

	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Bill of Materials', key: 'bill-of-materials', href: '/bom' },
		// { label: 'Blog', key: 'blog', href: '/blog' },
		// { label: 'Contact', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
});
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404');
});

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	auth: importRoutes('./auth')
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	//
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.all('/contact', routes.views.contact);
	//
	app.get('/bom/:category?', routes.views.boms);
	app.get('/bom/:bom', routes.views.bom);
	app.get('/bom/parts/:part', routes.views.bom_part);
	app.get('/bom/parts/:category?', routes.views.bom_parts);

	app.get('/parts/search', routes.views.parts.search);
	app.post('/parts/search/:part?', routes.views.parts.search);

	// Session
	app.all('/join', routes.views.session.join);
	app.all('/signin', routes.views.session.signin);
	app.get('/signout', routes.views.session.signout);
	app.all('/forgot-password', routes.views.session['forgot-password']);
	app.all('/reset-password/:key', routes.views.session['reset-password']);

	// Authentication
	app.all('/auth/confirm', routes.auth.confirm);
	app.all('/auth/app', routes.auth.app);
	app.all('/auth/:service', routes.auth.service);

	// User Profile
	app.all('/profile*', middleware.requireUser);
	app.all('/profile', routes.views.profile);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
