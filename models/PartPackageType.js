var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PartPackageType (Bill of Materials Part) Model
 * ==========
 */

var PartPackageType = new keystone.List('PartPackageType', {
	label: 'part-package-types',
	track: true,
	map: { name: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
});

PartPackageType.add({
	title: { type: String },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true }
});

PartPackageType.defaultColumns = 'title, createdBy|20%, state|20%';
PartPackageType.register();
