var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PartDatasheet Model
 * ==========
 */

var PartDatasheet = new keystone.List('PartDatasheet', {
	label: 'part-datasheets',
	track: true,
	map: { name: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
});

PartDatasheet.add({
	url: { type: Types.Url, required: true },
	manufacturer: { type: Types.Relationship, ref: 'Manufacturer' },
	part: { type: Types.Relationship, ref: 'Part' },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true },
});

PartDatasheet.defaultColumns = 'url, manufacturer|20%, createdBy|20%, state|20%';
PartDatasheet.register();
