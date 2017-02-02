// Handles allowing public users to sign up.
//See https://github.com/keystonejs/generator-keystone/issues/10
//
var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.formData = req.body || {};

	view.on('post', { action: 'create' }, function(next) {
		var newUser = new User.model({
			name: {
				first: locals.formData.first,
				last: locals.formData.last
			}
		});

		var updater = newUser.getUpdateHandler(req);

		console.log(req.body);

		updater.process(req.body, {
			fields: 'email, password',
			flashErrors: true,
			logErrors: true
		}, function(err,result) {
			console.log(err);
			console.log(result);
			if (err) {
				data.validationErrors = err.errors;
			} else {
				req.flash('success', 'Account created. Please sign in.');

				//auto-signin can be easily implemented using the keystone.session.signin() API.
				console.log(res.redirect('/keystone/signin'));
				// return res.redirect('/keystone/signin');
			}
			next();
		});

	});

	view.on('post', { action: 'update' }, function(next) {

		var editUser = req.user,
				updater = editUser.getUpdateHandler(req);

		// var fields = 'name,email,image,bio,title,contact.email,contact.phone';
		var fields = 'name,email';
		var opt = ['password','group'];

		for(var i=0;i<opt.length;i++){
			if(req.body.hasOwnProperty(opt[i])){
				if(req.body[opt[i]].length === 0){
					continue;
				}
				fields +=','+opt[i];
			}
		}

		updater.process( req.body, {
			flashErrors: true,
			fields: fields,
			errorMessage: 'There was a problem saving your profile: '
		}, function(err) {
			console.log(err);
			if (err) {
				locals.validationErrors = err.errors;
				locals.profileSaved = false;
			}else{
				locals.profileSaved = true;
			}
			next();
		});

	});

	// Render the view
	view.render('user/signup');
};
