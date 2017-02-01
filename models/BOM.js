var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Bills Model
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
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', default: '_id', hidden: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	notes: { type: Types.Html, wysiwyg: true, height: 150 },
	// categories: { type: Types.Relationship, ref: 'BillsCategory', many: true },
});

// BOM.schema.virtual('content.full').get(function () {
// 	return this.content.extended || this.content.brief;
// });

BOM.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
BOM.register();
