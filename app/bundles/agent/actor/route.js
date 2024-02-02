import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {

	/** @type {Object} */
	actions:
	{
		new()
		{
			this.transitionTo('agent.actor.add');
		}
	}

});
