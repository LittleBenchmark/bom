var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'bill-of-materials';
	locals.filters = {
		bill: req.params.bill,
	};
	locals.data = {
		bills: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('BOM').model.findOne({
			state: 'published',
			slug: locals.filters.bom,
		}).populate('author'); //TODO:categories

		q.exec(function (err, result) {
			locals.data.bom = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('BOM').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.boms = results;
			next(err);
		});

	});

	// Render the view
	view.render('boms/view');
};
