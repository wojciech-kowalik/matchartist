import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({

	category: attr(),
	description: attr(),
	displayOrder: attr(),
	mime_type: attr(),
	publicUrl: attr(),
	thumbnailUrl: attr(),
	title: attr()

});
