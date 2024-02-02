import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	// ------------------
	// Actions

	/** @type {Object} */
	actions: {
		show:   (model) => { },
		custom: (model) => { },
		delete: (model) => { Ember.Logger.debug('You are about to delete item ' + model.get('id')); }
	},

});
