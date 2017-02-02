var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Part Model
 * ==========
 */

var Part = new keystone.List('Part', {
	label: 'Parts',
	key: 'parts',
	track: true,
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Part.add({
	title: { type: String, required: true },
	number: { type: String, initial: true, required: true },
	status: { type: Types.Select, options: 'active, discontinued, not for new designs, discontinued at supplier, obsolete, preliminary', default: 'active', index: true, hidden: true },
	manufacturers: { type: Types.Relationship, ref: 'PartManufacturer', many: true },
	suppliers: { type: Types.Relationship, ref: 'PartSupplier', many: true },
	rohs_status: { type: Types.Select, options: 'RoHS Compliant, Not RoHS Compliant', label: 'RoHS Status', default: 'RoHS Compliant', index: true },
	lead_free_status: {
		type: Types.Select,
		options: 'Lead free, Contains Lead',
		label: 'Lead Free Status',
		default: 'Lead free',
		index: true
	},
	msl: {
		type: Types.Select,
		options: 'MSL 6 – Mandatory Bake before use, MSL 5A – 24 hours, MSL 5 – 48 hours, MSL 4 – 72 hours, MSL 3 – 168 hours, MSL 2A – 4 weeks, MSL 2 – 1 year, MSL 1 – Unlimited',
		note: 'See <a href="https://en.wikipedia.org/wiki/Moisture_sensitivity_level" title="Wikipedia: Mositure sensitivity level" target="_blank">Wikipedia: Mositure sensitivity level</a> for more.',
		label: 'Moisture Sensitivity Level (MSL)'
	},
	type: { type: Types.Relationship, ref: 'PartType' },
	mounting_type: {type: Types.Relationship, ref: 'PartMountingType', many: true, label:'Mounting Type' },
	package_type: {type: Types.Relationship, ref: 'PartPackageType', many: true, label: 'Package Type' },
	description: { type: Types.Html, wysiwyg: false, height: 50 },
	image: { type: Types.CloudinaryImage },
	notes: { type: Types.Html, wysiwyg: false, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true, hidden: true },
	categories: { type: Types.Relationship, ref: 'PartCategory', many: true },
	subcategories: { type: Types.Relationship, ref: 'PartSubcategory', many: true }
});

Part.relationship({ ref: 'BOMPart', path: 'part' });

Part.defaultColumns = 'title, number|20%, createdBy|20%, state|20%';

Part.register();
