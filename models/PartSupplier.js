var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PartSupplier Model
 * ==========
 */

var PartSupplier = new keystone.List('PartSupplier', {
	label: 'parts-suppliers',
	track: true,
	map: { name: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
});

PartSupplier.add({
	number: { type: String, initial: false, required: true },
	url: { type: String },
	part: { type: Types.Relationship, ref: 'Part', initial: false, required: true, many: true },
	supplier: { type: Types.Relationship, ref: 'Supplier', initial: false, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true }
});

PartSupplier.defaultColumns = 'number, part|20%, supplier|20%, createdBy|20%';
PartSupplier.register();
