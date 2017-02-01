var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PartSubcategory Model
 * ==================
 */

var PartSubcategory = new keystone.List('PartSubcategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	track: true
});

PartSubcategory.add({
	categories: { type: Types.Relationship, ref: 'PartCategory', initial: false, required: true, many: true },
	name: { type: String, initial: false, required: true }
});

PartSubcategory.relationship({ ref: 'Part', path: 'subcategories' });

PartSubcategory.register();
