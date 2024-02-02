import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Config from '../../../config/environment';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {

	session: Ember.inject.service(),

	/**
	 *
	 * @param params
	 * @returns {*}
	 */
	model(params)
	{

		let files = {};
		files     = this.get('store').findAll('file', {
			reload: true
		});

		return Ember.RSVP.hash({
			role: this.get('store').findRecord('role', params.id),
			user: this.get('store').findRecord('user', this.get('session').get('data.authenticated').id),
			files: files
		});

	},

	/**
	 *
	 * @param data
	 */
	afterModel(data)
	{
		let actor = data.user.get('actor');
		let role  = data.role;

		let hearing = this.get('store').query('hearing', {
			castingId: role.get('casting.id'),
			stageId: role.get('casting.currentStageId')
		});

		let question = this.get('store').query('question', {
			roleId: role.get('id'),
			actorId: actor.get('id')
		});

		question.then(function(data) {
			actor.set('questions', data);
		});

		hearing.then(function(data) {
			role.set('hearings', data);
		});

	}

});
