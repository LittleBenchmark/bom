var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PartMountingType (Bill of Materials Part) Model
 * ==========
 */

var PartMountingType = new keystone.List('PartMountingType', {
	label: 'Mounting Types',
	path: 'part-mounting-types',
	track: true,
	map: { name: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
});

PartMountingType.add({
	title: { type: String },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true },
});

PartMountingType.defaultColumns = 'title, createdBy|20%, state|20%';
PartMountingType.register();
