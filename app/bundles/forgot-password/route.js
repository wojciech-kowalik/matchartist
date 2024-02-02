import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import Config from '../../config/environment';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {

	model() {
		return this.store.createRecord('user',{
			urlType: Config.APP.AUTH_PASSWORD_URL_TYPE
		});
	}

});