import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({

	category: attr(),
	title: attr(),
	description: attr(),
	displayOrder: attr(),
	mimeType: attr(),
	publicUrl: attr(),
	thumbnailUrl: attr(),
	icon: attr(),
	files: attr()

});
