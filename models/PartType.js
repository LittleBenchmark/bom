var keystone = require('keystone');

/**
 * PartType Model
 * ==================
 */

var PartType = new keystone.List('PartType', {
	autokey: { from: 'name', path: 'key', unique: true },
	track: true
});

PartType.add({
	name: { type: String, required: true },
});

PartType.relationship({ ref: 'Part', path: 'type' });

PartType.register();
