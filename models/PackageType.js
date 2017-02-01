var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PackageType (Bill of Materials Part) Model
 * ==========
 */

var PackageType = new keystone.List('PackageType', {
	label: 'package-types',
	track: true,
	map: { name: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
});

PackageType.add({
	title: { type: String },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true }
});

PackageType.defaultColumns = 'title, createdBy|20%, state|20%';
PackageType.register();
