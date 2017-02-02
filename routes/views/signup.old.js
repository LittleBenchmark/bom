// @file signup.js
// @path /routes/views/signup.js
// @description Handles the post request when the user tries to sign up.
// @url https://github.com/keystonejs/generator-keystone/issues/10
//
var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'signup';
	locals.filters = {
	};
	locals.data = {
	};

	locals.formData = req.body || {};

	// var User = keystone.list(keystone.get('user model'));

	view.on('post', { action: 'user.create' }, function(next) {

		// if (!keystone.security.csrf.validate(req)) {
		// 	req.flash('error', 'There was an error with your request, please try again.');
		// 	return renderView();
		// }

		if(locals.formData.password !== locals.formData.password_confirm){
			next();
		}

		var newUser = new User.model({
			name: {
				first: locals.formData.first,
				last: locals.formData.last
			},
			email: locals.formData.email,
			password: locals.formData.password
		});

		newUser.isAdmin = false;

		newUser.save(function(err, result) {
			console.log(err);
			console.log(result);
			if (err) {
				locals.data.validationErrors = err.errors;
			} else {
				req.flash('success', 'Account created. Please sign in.');

				//auto-signin can be easily implemented using the keystone.session.signin() API.
				return res.redirect('/keystone/signin');
			}
			next();
		});

	});

	// view.on('post', { action: 'update' }, function(next) {
	//
	// 	var editUser = req.user,
	// 			updater = editUser.getUpdateHandler(req);
	//
	// 	// var fields = 'name,email,image,bio,title,contact.email,contact.phone';
	// 	var fields = 'name,email';
	// 	var opt = ['password','group'];
	//
	// 	for(var i=0;i<opt.length;i++){
	// 		if(req.body.hasOwnProperty(opt[i])){
	// 			if(req.body[opt[i]].length === 0){
	// 				continue;
	// 			}
	// 			fields +=','+opt[i];
	// 		}
	// 	}
	//
	// 	updater.process( req.body, {
	// 		flashErrors: true,
	// 		fields: fields,
	// 		errorMessage: 'There was a problem saving your profile: '
	// 	}, function(err) {
	// 		console.log(err);
	// 		if (err) {
	// 			locals.validationErrors = err.errors;
	// 			locals.profileSaved = false;
	// 		}else{
	// 			locals.profileSaved = true;
	// 		}
	// 		next();
	// 	});
	//
	// });

	// Render the view
	view.render('user/signup');
};
