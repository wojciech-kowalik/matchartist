import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {

	tpActorAttributeFilter: Ember.inject.service(),

	activate: function() {
		this._super.apply(this, arguments);
	},

	// ------------------
	// Actions

	/** @type {Object} */
	actions: {
		show: (model) 	=> {},
		custom: (model) => {},
		delete: (model) => {}

	},

	setupController: function (controller, model)
	{
		let filter = this.get('tpActorAttributeFilter').get('filter');
		controller.set('gridConfiguration.additionals.parameters.attributes_filter', filter);
	}
});
