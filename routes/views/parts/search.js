var keystone = require('keystone');
var request = require('request');
var urlencode = require('urlencode');
var octo = require('node-octo');
var octopart = require('octopart');

// See https://www.npmjs.com/package/request-debug
require('request-debug')(request);

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'parts-search';
	locals.filters = {};
	locals.matches = 0;
	locals.data = {
		json: {},
		html: {}
	};

	locals.formData = req.body || {};

	// See https://www.npmjs.com/package/node-octo
	// locals.opApiKey = process.env.OCTOPART_API_KEY;
	var cli = octo.createV3(process.env.OCTOPART_API_KEY);

	view.on('init', function(next) {

		// Add code for the view

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

	view.on('post', { action: 'part.search' }, function(next) {
		// Add code for the POST action

		var encodedQuery = urlencode(locals.formData.query);
		var queries = [{
			mpn: encodedQuery,
			limit: 2
		}, {
			q: encodedQuery + '*',
			limit: 2
		}];

		cli.partsMatch({
			queries: queries,
			exact_only: false,
			include: ['datasheets', 'imagesets']
		}, {}, function(err, res) {
			// console.log('---');
			// console.log(res.results[0].items);
			if (!err) {
				locals.matches = res.results[0].hits;
				locals.data.json = JSON.stringify(res.results[0]);
			} else {
				console.log(err);
			}
			next();
		});
	});

	// Render the view
	view.render('parts/search');
};
