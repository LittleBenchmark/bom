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
	categories: { type: Types.Relationship, ref: 'PartCategory', initial: true, required: true, many: true },
	name: { type: String, required: true }
});

PartSubcategory.relationship({ ref: 'Part', path: 'subcategories' });

PartSubcategory.register();
