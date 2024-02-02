import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {

	// ------------------
	// Actions

	/** @type {Object} */
	actions: {
		new() {
			this.transitionTo('message.new', 0);
		},
		show:   (model) => { },
		custom: (model) => { },
		delete(model) {
			model.destroyRecord().then(() => {
				model.action();
			});
		}
	},
});
