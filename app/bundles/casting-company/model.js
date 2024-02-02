import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({

	name: [
		validator('presence', true)
	],

	address: [
		validator('presence', true)
	],

	city: [
		validator('presence', true)
	],

	zipNumber: [
		validator('presence', true)
	],

	country: [
		validator('presence', true)
	],

	idNumber: [
		validator('presence', true)
	],

	contactFirstname: [
		validator('presence', true)
	],

	contactLastname: [
		validator('presence', true)
	],

	contactEmail: [
		validator('presence', true)
	],

	contactPhone: [
		validator('presence', true)
	],

	taxNumber: [
		validator('presence', true)
	]

});

export default Model.extend(Validations, {

	// relations
	user: belongsTo('user'),

	name: attr('string'),
	description: attr('string'),
	avatar: attr(),
	address: attr(),
	city: attr(),
	zipNumber: attr(),
	country: attr(),
	idNumber: attr(),
	contactFirstname: attr(),
	contactLastname: attr(),
	contactEmail: attr(),
	contactPhone: attr(),
	taxNumber: attr(),
	website: attr()

});
