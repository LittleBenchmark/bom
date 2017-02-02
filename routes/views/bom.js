var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'bill-of-materials';
	locals.filters = {
		bom: req.params.bom,
	};
	locals.data = {
		boms: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('BOM').model.findOne({
			state: 'published',
			slug: locals.filters.bom,
		}).populate('createdBy', 'categories');

		q.exec(function (err, result) {
			locals.data.bom = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('BOM').model.find().where('state', 'published').sort('-publishedDate').populate('createdBy').limit('4');

		q.exec(function (err, results) {
			locals.data.boms = results;
			next(err);
		});

	});

	// Render the view
	view.render('bom/view');
};
