import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {

	model(params)
	{
		this.controllerFor('actor/invitation').set('id', params.id);
		return this.get('store').findAll('casting');
	}

});
