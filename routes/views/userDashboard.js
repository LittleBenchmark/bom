var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'userDashboard';
	locals.filters = {
		// id: req.params.id
	};
	locals.data = {
		user: []
	};

	// Load the current user dashboard
	view.on('init', function (next) {

		//Find the id of the currently logged in user.
		console.log(res.locals.user);
		console.log(res.locals.user.id);
		var q = keystone.list('User').model.findOne({
			group: 'user',
			id: res.locals.user.id,
		}).populate('boms');

		q.exec(function (err, result) {
			// locals.data.user = result;
			next(err);
		});

	});

	// Load other posts
	// view.on('init', function (next) {
	//
	// 	var q = keystone.list('BOM').model.find().where('state', 'published').sort('-publishedDate').populate('createdBy').limit('4');
	//
	// 	q.exec(function (err, results) {
	// 		locals.data.boms = results;
	// 		next(err);
	// 	});
	//
	// });

	// Render the view
	view.render('user/dashboard');
};
