var keystone = require('keystone');

/**
 * PartCategory Model
 * ==================
 */

var PartCategory = new keystone.List('PartCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	track: true
});

PartCategory.add({
	name: { type: String, required: true },
	subcategories: { type: Types.Relationship, ref: 'Subcategory', many: true }
});

PartCategory.relationship({ ref: 'Part', path: 'categories' });
PartSubcategory.relationship({ ref: 'PartSubcategory', path: 'category' });

PartCategory.register();
