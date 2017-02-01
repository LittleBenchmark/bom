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
	url: { type: String },
	part_no: { type: String, required: true },
	part: { type: Types.Relationship, ref: 'Part', many: true },
	supplier: { type: Types.Relationship, ref: 'Supplier' },
});

PartSupplier.defaultColumns = 'part_no, part|20%, supplier|20%, createdBy|20%';
PartSupplier.register();
