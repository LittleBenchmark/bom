var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PartLocation Model
 * ==========
 */

var PartLocation = new keystone.List('PartLocation', {
	label: 'part-locations',
	track: true,
	map: { name: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
});

PartLocation.add({
	url: { type: Types.Url, required: true },
	part: { type: Types.Relationship, ref: 'Part', required: true },
	supplier: { type: Types.Relationship, ref: 'Supplier', many: true },
	// description: { type: Types.Html, wysiwyg: false, height: 50 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true },
});

PartLocation.defaultColumns = 'url, part|20%, createdBy|20%, state|20%';
PartLocation.register();
