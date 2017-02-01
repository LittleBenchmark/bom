var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PartManufacturer Model
 * ==========
 */

var PartManufacturer = new keystone.List('PartManufacturer', {
	label: 'Manufacturers',
	path: 'part-manufacturers',
	track: true,
	map: { name: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
});

PartManufacturer.add({
	number: { type: String, initial: true, required: true },
	part: { type: Types.Relationship, ref: 'Part', initial: true, required: true, many: true },
	manufacturer: { type: Types.Relationship, ref: 'Manufacturer', initial: true, required: true },
	datasheet: { type: Types.Relationship, ref: 'PartDatasheet', many: true },
});

PartManufacturer.defaultColumns = 'number, part|20%, manufacturer|20%, createdBy|20%';
PartManufacturer.register();
