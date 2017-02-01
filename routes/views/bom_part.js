var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'bill-of-material-part';
	locals.filters = {
		part: req.params.id,
	};
	locals.data = {
		parts: [],
	};

	// Load the current part
	view.on('init', function (next) {

		var q = keystone.list('BOMPart').model.findOne({
			state: 'published',
			slug: locals.filters.part,
		}).populate('createdBy');

		q.exec(function (err, result) {
			locals.data.parts = result;
			next(err);
		});

	});

	// Load other parts
	view.on('init', function (next) {

		var q = keystone.list('BOMPart').model.find().where('state', 'published').sort('-updatedAt').populate('createdBy').limit('4');

		q.exec(function (err, results) {
			locals.data.parts = results;
			next(err);
		});

	});

	// Render the view
	view.render('bom/part');
};
