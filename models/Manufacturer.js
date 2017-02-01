var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Manufacturer Model
 * ==========
 */

var Manufacturer = new keystone.List('Manufacturer', {
	label: 'manufacturers',
	track: true,
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Manufacturer.add({
	title: { type: String, required: true },
	image: { type: Types.CloudinaryImage },
	url: { type: Types.Url },
	standard_lead_time: { type: String },
	description: { type: Types.Html, wysiwyg: false, height: 50 },
	notes: { type: Types.Html, wysiwyg: false, height: 150 },
	part: { type: Types.Relationship, ref: 'PartManufacturer', many: true },
	categories: { type: Types.Relationship, ref: 'ManufacturerCategory', many: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true }
});

Manufacturer.defaultColumns = 'title, url|20%, createdBy|20%, state|20%';
Manufacturer.register();
