import DS from 'ember-data';
import TPDataAdapterMixin from '../mixins/tp-data-adapter';
import Config from '../config/environment';
import Ember from 'ember';

export default DS.RESTAdapter.extend(TPDataAdapterMixin, {

	namespace: 'v1',
	host: Config.APP.API_URL,
	authorizer: 'authorizer:tp',
	session: Ember.inject.service(),

	headers: {
		'Content-type': 'application/json; charset=UTF-8',
		'Accept': 'application/json, text/javascript; q=0.01',
		'token-type': 'Bearer'
	},

	ajax: function(url, type, hash) {
		return this._super(url, type, hash);
	},

	handleResponse: function (status, headers, payload) {

		if (status === 422) {

			let errors = payload.errors.full_messages || payload.errors;
			return new DS.InvalidError(errors.map(item => ` ${item}`));
		}
		return this._super(...arguments);
	}

});