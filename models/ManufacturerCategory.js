var keystone = require('keystone');

/**
 * ManufacturerCategory Model
 * ==================
 */

var ManufacturerCategory = new keystone.List('ManufacturerCategory', {
	label: 'Categories',
	path: 'manufacturer-categories',
	autokey: { from: 'name', path: 'key', unique: true },
	track: true
});

ManufacturerCategory.add({
	name: { type: String, required: true },
});

ManufacturerCategory.relationship({ ref: 'Manufacturer', path: 'categories' });

ManufacturerCategory.register();
