var keystone = require('keystone');

/**
 * SupplierCategory Model
 * ==================
 */

var SupplierCategory = new keystone.List('SupplierCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	track: true
});

SupplierCategory.add({
	name: { type: String, required: true },
});

SupplierCategory.relationship({ ref: 'Supplier', path: 'categories' });

SupplierCategory.register();
