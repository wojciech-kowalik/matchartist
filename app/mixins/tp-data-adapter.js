import Ember from 'ember';

const { inject: { service }, Mixin, assert, isPresent, run} = Ember;

export default Mixin.create({

	session: service('session'),
	authorizer: null,

	ajaxOptions() {

		const authorizer = this.get('authorizer');
		assert("You're using the DataAdapterMixin without specifying an authorizer. Please add `authorizer: 'authorizer:application'` to your adapter.", isPresent(authorizer));

		let hash = this._super(...arguments);
		let { beforeSend } = hash;

		hash.beforeSend = (xhr) => {

			this.get('session').authorize(authorizer, (headerName, headerValue) => {
				xhr.setRequestHeader(headerName, headerValue);
			});

			if (beforeSend) {
				beforeSend(xhr);
			}
		};

		return hash;
	},

	/**
	 Adds request headers containing the authorization data as constructed
	 by the {{#crossLink "DataAdapterMixin/authorizer:property"}}{{/crossLink}}.
	 This method will only be called in Ember Data 2.7 or greater. Older versions
	 will rely on `ajaxOptions` for request header injection.
	 @method handleResponse
	 @protected
	 */
	headersForRequest() {
		const authorizer = this.get('authorizer');
		assert("You're using the DataAdapterMixin without specifying an authorizer. Please add `authorizer: 'authorizer:application'` to your adapter.", isPresent(authorizer));

		let headers = this._super(...arguments);
		headers = Object(headers);
		this.get('session').authorize(authorizer, (headerName, headerValue) => {
			headers[headerName] = headerValue;
		});
		return headers;
	},

	handleResponse(status) {

		if (status === 401 && this.get('session.isAuthenticated')) {
			this.get('session').invalidate();
		}
		return this._super(...arguments);
	}
});

