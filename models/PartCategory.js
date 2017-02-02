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
	name: { type: String, required: true },
	subcategories: { type:Types.Relationship, ref: 'PartSubcategory', many: true }
});

PartCategory.relationship({ ref: 'Part', path: 'categories' });
PartCategory.relationship({ ref: 'PartSubcategory', path: 'categories' });

PartCategory.defaultColumns = 'name|20%, subcategories|20%, createdBy|20%';

PartCategory.register();
