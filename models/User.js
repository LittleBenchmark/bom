var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	group: { type: Types.Select, options: 'user, editor, admin', default: 'user' },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
},
'Permissions', {
	isAdmin: {
		type: Boolean,
		label: 'Admins',
		index: true
	},
	isUser: {
		type: Boolean,
		label: 'Public Users',
		index: true
	},
	isEditor: {
		type: Boolean,
		label: 'Public Editors',
		index: true
	}
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'BOM', path: 'boms', refPath: 'createdBy' });


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
