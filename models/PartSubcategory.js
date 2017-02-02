var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PartSubcategory Model
 * ==================
 */

var PartSubcategory = new keystone.List('PartSubcategory', {
	label: 'Subcategories',
	path: 'part-subcategories',
	autokey: { from: 'name', path: 'key', unique: true },
	track: true
});

PartSubcategory.add({
	name: { type: String, required: true },
	categories: {type: Types.Relationship, ref: 'PartCategory', many: true }
});

PartSubcategory.relationship({ ref: 'Part', path: 'subcategories' });
PartSubcategory.relationship({ ref: 'PartCategory', path: 'subcategories' });

PartSubcategory.defaultColumns = 'categories, name|20%, createdBy|20%';

PartSubcategory.register();
