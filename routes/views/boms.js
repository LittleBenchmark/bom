var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'bill-of-materials';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		boms: [],
		categories: []
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('BOMCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('BOM').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.bomCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {
		if (req.params.category) {
			keystone.list('BOMCategory').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the bill of materials
	view.on('init', function (next) {

		var q = keystone.list('BOM').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('createdBy', 'categories');

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function (err, results) {
			locals.data.boms = results;
			next(err);
		});
	});

	// Render the view
	view.render('bom/index');
};
