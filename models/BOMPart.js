var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * BOMPart (Bill of Materials Part) Model
 * ==========
 */

var BOMPart = new keystone.List('BOMPart', {
	label: 'bom-parts',
	track: true,
	map: { name: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
});

BOMPart.add({
	number: { type: String },
	designator: { type: String },
	part: { type: Types.Relationship, ref: 'Part', initial: false, required: true },
	description: { type: Types.Html, wysiwyg: false, height: 50 },
	quantity: { type: Types.Number },
	image: { type: Types.CloudinaryImage, hidden: true },
	notes: { type: Types.Html, wysiwyg: false, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true },
	categories: { type: Types.Relationship, ref: 'PartCategory', many: true },
});

BOMPart.defaultColumns = 'title, number|20%, createdBy|20%, state|20%';
BOMPart.register();
