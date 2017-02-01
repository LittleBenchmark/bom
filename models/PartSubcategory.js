var keystone = require('keystone');

/**
 * PartSubcategory Model
 * ==================
 */

var PartSubcategory = new keystone.List('PartSubcategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	track: true
});

PartSubcategory.add({
	category: { type: Types.Relationship, ref: 'PartCategory' },
	name: { type: String, required: true }
});

PartSubcategory.relationship({ ref: 'PartCategory', path: 'subcategories' });
PartSubcategory.register();
