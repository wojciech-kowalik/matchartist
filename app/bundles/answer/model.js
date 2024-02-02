import DS from 'ember-data';
import { belongsTo, hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';

export default DS.Model.extend({

	// relations
	question: belongsTo('question'),

	comment: attr(),
	option: attr('boolean')

});
