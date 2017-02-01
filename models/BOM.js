var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * BOM (Bill of Material) Model
 * ==========
 */

var BOM = new keystone.List('BOM', {
	label: 'Bill of Materials',
	track: true,
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

BOM.add({
	title: { type: String, required: true },
	part: { type: Types.Relationship, ref: 'BomPart', required: true, initial: false, many: true },
	description: { type: Types.Html, wysiwyg: false, height: 50 },
	image: { type: Types.CloudinaryImage },
	author: { type: Types.Relationship, ref: 'User', default: '_id', hidden: true },
	notes: { type: Types.Html, wysiwyg: false, height: 150 },
	categories: { type: Types.Relationship, ref: 'BOMCategory', many: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true }
});

// BOM.schema.virtual('content.full').get(function () {
// 	return this.content.extended || this.content.brief;
// });

BOM.defaultColumns = 'title, state|20%, createdBy|20%, updatedAt|20%';
BOM.register();
