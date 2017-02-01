var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PartCategory Model
 * ==================
 */

var PartCategory = new keystone.List('PartCategory', {
	label: 'Categories',
	path: 'part-categories',
	autokey: { from: 'name', path: 'key', unique: true },
	track: true
});

PartCategory.add({
	name: { type: String, required: true }
});

PartCategory.relationship({ ref: 'Part', path: 'categories' });
PartCategory.relationship({ ref: 'PartSubcategory', path: 'categories' });

PartCategory.register();
