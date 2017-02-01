var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PartManufacturer Model
 * ==========
 */

var PartManufacturer = new keystone.List('PartManufacturer', {
	label: 'part-manufacturers',
	track: true,
	map: { name: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
});

PartManufacturer.add({
	number: { type: String, initial: false, required: true },
	part: { type: Types.Relationship, ref: 'Part', initial: false, required: true, many: true },
	manufacturer: { type: Types.Relationship, ref: 'Manufacturer', initial: false, required: true },
	datasheet: { type: Types.Relationship, ref: 'PartDatasheet', many: true },
});

PartManufacturer.defaultColumns = 'number, part|20%, manufacturer|20%, createdBy|20%';
PartManufacturer.register();
