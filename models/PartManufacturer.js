var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PartManufacturer Model
 * ==========
 */

var PartManufacturer = new keystone.List('PartManufacturer', {
	label: 'parts-manufacturers',
	track: true,
	map: { name: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
});

PartManufacturer.add({
	number: { type: String, required: true },
	part: { type: Types.Relationship, ref: 'Part', many: true },
	manufacturer: { type: Types.Relationship, ref: 'Manufacturer' },
	datasheet: { type: Types.Relationship, ref: 'PartDatasheet' },
});

PartManufacturer.defaultColumns = 'part_no, part|20%, supplier|20%, createdBy|20%';
PartManufacturer.register();
