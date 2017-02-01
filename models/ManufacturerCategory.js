var keystone = require('keystone');

/**
 * ManufacturerCategory Model
 * ==================
 */

var ManufacturerCategory = new keystone.List('ManufacturerCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	hidden: true
});

ManufacturerCategory.add({
	name: { type: String, required: true },
});

ManufacturerCategory.relationship({ ref: 'Manufacturer', path: 'categories' });

ManufacturerCategory.register();
