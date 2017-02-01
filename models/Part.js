var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Part Model
 * ==========
 */

var Part = new keystone.List('Part', {
	label: 'parts',
	track: true,
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Part.add({
	title: { type: String, required: true },
	number: { type: String, required: true },
	manufacturers: { type: Types.Relationship, ref: 'PartManufacturer', many: true },
	purchase_locations: { type: Types.Relationship, ref: 'PartLocation', many: true },
	rohs: { type: String },
	lead_free_status: { type: String },
	msl: { type: String},
	type: { type: Types.Relationship, ref: 'PartType' },
	mounting_type: {type: Types.Relationship, ref: 'MountingType', many: true },
	package_type: {type: Types.Relationship, ref: 'PackageType', many: true },
	description: { type: Types.Html, wysiwyg: false, height: 50 },
	image: { type: Types.CloudinaryImage },
	notes: { type: Types.Html, wysiwyg: false, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true },
	categories: { type: Types.Relationship, ref: 'PartCategory', many: true },
});

Part.defaultColumns = 'title, number|20%, createdBy|20%, state|20%';
Part.register();
