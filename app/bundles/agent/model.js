import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({

	// relations
	user: belongsTo('user'),
	actors: hasMany('actor'),

	userId: attr('number'),
	gender: attr('string'),
	birthDate: attr('string'),
	lookingForAgent: attr('boolean'),
	userCountry: attr('string'),
	personalNumber: attr('string')

});
