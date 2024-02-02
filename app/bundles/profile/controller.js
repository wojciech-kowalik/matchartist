import Ember from 'ember';

export default Ember.Controller.extend({
	mainAttr: {
		height: false,
		weight: false,
		eyeColor: false
	},
	session: Ember.inject.service()

});
