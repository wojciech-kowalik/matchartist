import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ActorAttributeFinder from '../../../mixins/actor-attribute-finder';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ActorAttributeFinder, ResetScrollMixin, {

	model(params)
	{
		this.get('store').unloadAll('actor');
		this.get('store').unloadAll('attribute');
		this.get('store').unloadAll('actorAttribute');

		return Em.RSVP.hash({
			profile: this.get('store').findRecord('actor', params.id),
			attributes: this.get('store').query('attribute', {}),
			actorAttributes: this.get('store').query('actorAttribute', { id: params.id })
		});
	},

	afterModel(data)
	{
		let attributes     = data.attributes;
		let actorAttribute = data.actorAttributes;
		this.getValuesToString(actorAttribute);

		let actor = data.profile;
		let user = actor.get('user');
		let files = this.get('store').query('file', {type: 'actor', id: user.id});

		files.then(function(response) {
			actor.set('files', response);
		});

	}
});
