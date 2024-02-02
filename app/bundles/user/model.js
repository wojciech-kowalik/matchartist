import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import moment from 'moment';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({

	firstname: [
		validator('presence', true)
	],

	lastname: [
		validator('presence', true)
	],

	email: [
		validator('format', {
			type: 'email'
		})
	],

	verifiedEmail: [
		validator('presence', true),
		validator('confirmation', {
			on: 'email',
			message: 'Doesn\'t match'
		})
	],

	password: [
		validator('presence', true)
	],

	verifiedPassword: [
		validator('presence', true),
		validator('confirmation', {
			on: 'password',
			message: 'Doesn\'t match'
		})
	],

	gender: [
		validator('presence', true)
	],

	birthDate: [
		validator('presence', true)
	],

	personalNumber: [
		validator('presence', false),
		validator('length', {
			min: 6
		})
	],

	userCountry: [
		validator('presence', true)
	],

});

export default Model.extend(Validations, {

	// relations
	attributes: hasMany('attribute'),
	actor: belongsTo('actor', { async: false }),
	castingCompanies: hasMany('casting-company', { async: false }),

	// members
	actorId: attr('number'),
	agentId: attr('number'),
	firstname: attr('string'),
	lastname: attr('string'),
	email: attr('string'),
	password: attr('string'),
	passwordConfirmation: attr('string'),
	role: attr('string'),
	gender: attr('string'),
	birthDate: attr('string'),
	userCountry: attr('string'),
	personalNumber: attr('string'),
	confirmSuccessUrl: attr(),
	redirectUrl: attr(),
	avatar: attr(),
	needRegistrationDetails: attr('boolean'),
	// extras
	urlType: attr('string', {defaultValue: null}),
	message: attr('string'),

	isAttributeRequired: Ember.computed('needRegistrationDetails', function (){
		return this.get('needRegistrationDetails');
	}),

	age: Ember.computed('birthDate', function (){
		return moment().diff(this.get('birthDate'), 'years');
	})
});
