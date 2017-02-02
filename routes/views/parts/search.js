var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'parts-search';
	locals.filters = {

	};
	locals.data = {
		results: []
	};

	locals.formData = req.body || {};

	locals.opApiKey = process.env.OCTOPART_API_KEY;

	view.on('init', function (next) {

		console.log('HERE');
		// var q = keystone.list('BOMPart').model.findOne({
		// 	state: 'published',
		// 	slug: locals.filters.part,
		// }).populate('createdBy');
		//
		// q.exec(function (err, result) {
		// 	locals.data.parts = result;
		// 	next(err);
		// });
		next();
	});

	view.on('post', { action: 'part.search' }, function(next){
		console.log('HERE POST');

		console.log(locals.formData);

		var url = 'http://octopart.com/api/v3/parts/match?';
				url += '&queries=[{"mpn":"SN74S74N"}]';
				url += '&apikey=' + opApiKey;
				url += '&callback=?';

		next();
	});

	// Render the view
	view.render('parts/search');
};
