var keystone = require('keystone');

/**
 * BOMCategory Model
 * ==================
 */

var BOMCategory = new keystone.List('BOMCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	track: true
});

BOMCategory.add({
	name: { type: String, required: true },
});

BOMCategory.relationship({ ref: 'BOM', path: 'categories' });

BOMCategory.register();
