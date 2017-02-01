var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Supplier Model
 * ==========
 */

var Supplier = new keystone.List('Supplier', {
	label: 'suppliers',
	track: true,
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Supplier.add({
	title: { type: String, required: true },
	image: { type: Types.CloudinaryImage },
	url: { type: Types.Url },
	description: { type: Types.Html, wysiwyg: false, height: 50 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true },
	notes: { type: Types.Html, wysiwyg: false, height: 150 },
	part: { type: Types.Relationship, ref: 'PartSupplier', many: true },
	categories: { type: Types.Relationship, ref: 'SupplierCategory', many: true }
});

Supplier.defaultColumns = 'title, url|20%, createdBy|20%, state|20%';
Supplier.register();
