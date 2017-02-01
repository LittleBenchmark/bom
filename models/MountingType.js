var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * MountingType (Bill of Materials Part) Model
 * ==========
 */

var MountingType = new keystone.List('MountingType', {
	label: 'mounting-types',
	track: true,
	map: { name: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
});

MountingType.add({
	title: { type: String },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true },
});

MountingType.defaultColumns = 'title, createdBy|20%, state|20%';
MountingType.register();
