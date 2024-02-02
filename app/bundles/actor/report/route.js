import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {

	model(params)
	{
		this.get('store').unloadAll('role');

		return Em.RSVP.hash({
			roles: this.get('store').query('role', {'castingId': params.castingId}),
			actor: this.get('store').findRecord('actor', params.actorId)
		});
	},

	afterModel(model, params)
	{
		let role = model.roles.get('firstObject');

		model.role = role;

		model.report = this.get('store').query('report', {
			roleId: role.get('id'),
			actorId: model.actor.get('id')
		});

	}
});
