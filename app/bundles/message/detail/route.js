import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {

	model(params)
	{
		return this.get('store').findRecord('message', params.id);
	},

	actions: {
		delete(model)
		{
			model.destroyRecord();
			this.transitionTo('message.index');
		}
	}
});
