import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Config from '../../config/environment';

export default Model.extend({

	// relations
	questions: hasMany('question'),
	files: hasMany('file'),
	agent: belongsTo('agent'),

	userId: attr('number'),
	email: attr('string'),
	firstname: attr('string'),
	gender: attr('string'),
	birthDate: attr('string'),
	lookingForAgent: attr('boolean'),
	userCountry: attr('string'),
	personalNumber: attr('string'),
	castingInvited: attr('boolean'),
	user: attr(),
	assignedAgents: attr(),
	role: attr(),

	//computed
	genderSign: Ember.computed('gender', function () {
		return (this.get('gender') === 'm') ? 'fa-mars' : 'fa-venus';
	}),

	age: Ember.computed('birthDate', function (){
		return moment().diff(this.get('birthDate'), 'years');
	}),

	userCountryName: Ember.computed('userCountry', function () {
		let countries = Config.APP.constans.countries;
		let userCountry = countries.filter(
				country => country.value === this.get('userCountry')
		);
		return Ember.isEmpty(userCountry) ? null : userCountry[0].label;
	})
});
