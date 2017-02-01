var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PartDatasheet Model
 * ==========
 */

var PartDatasheet = new keystone.List('PartDatasheet', {
	label: 'Datasheets',
	path: 'part-datasheets',
	track: true,
	map: { name: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
});

PartDatasheet.add({
	part: { type: Types.Relationship, ref: 'Part', initial: false, required: true },
	url: { type: Types.Url, initial: false, required: true },
	manufacturer: { type: Types.Relationship, ref: 'Manufacturer' },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true },
});

PartDatasheet.defaultColumns = 'url, manufacturer|20%, createdBy|20%, state|20%';
PartDatasheet.register();
