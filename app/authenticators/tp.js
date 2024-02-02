import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';
const { RSVP: { Promise }, isEmpty, run, $: jQuery, assign: emberAssign, merge } = Ember;
const assign = emberAssign || merge;

export default Base.extend({

	serverTokenEndpoint: config.APP.API_URL + '/v1/auth/sign_in',
	resourceName: '',
	tokenAttributeName: 'access-token',
	identificationAttributeName: 'email',
	rejectWithXhr: false,

	restore(data) {

		return this._validate(data) ? Promise.resolve(data) : Promise.reject();
	},

	authenticate(identification, password) {

		return new Promise((resolve, reject) => {

			const useXhr = this.get('rejectWithXhr');
			const { resourceName, identificationAttributeName, tokenAttributeName } = this.getProperties('resourceName', 'identificationAttributeName', 'tokenAttributeName');
			const data = {};
			data[resourceName] = {password};
			data[resourceName][identificationAttributeName] = identification;

			return this.makeRequest(data).then(
				(response, text, request) => {

					let responseData = {
						'access-token': request.getResponseHeader('access-token'),
						client: request.getResponseHeader('client'),
						uid: request.getResponseHeader('uid'),
						email: response.data.email,
						logged: new Date(),
						id: response.data.id,
						role: response.data.role
					};

					if (this._validate(responseData)) {
						run(null, resolve, responseData);
					} else {
						run(null, reject, `Check that server response includes ${tokenAttributeName} and ${identificationAttributeName}`);
					}
				},
				(xhr) => run(null, reject, useXhr ? xhr : (xhr.responseJSON || xhr.responseText))
			);
		});
	},

	invalidate() {

		return Promise.resolve();
	},

	makeRequest(data, options) {

		const serverTokenEndpoint = this.get('serverTokenEndpoint');
		let requestOptions = {};
		assign(requestOptions, {
			url: serverTokenEndpoint,
			type: 'POST',
			dataType: 'json',
			data,
			beforeSend(xhr, settings) {
				xhr.setRequestHeader('Accept', settings.accepts.json);
			}
		});
		assign(requestOptions, options || {});

		return jQuery.ajax(requestOptions);
	},

	_validate(data) {

		const tokenAttributeName = this.get('tokenAttributeName');
		const identificationAttributeName = this.get('identificationAttributeName');
		const resourceName = this.get('resourceName');
		const _data = data[resourceName] ? data[resourceName] : data;

		return !isEmpty(_data[tokenAttributeName]) && !isEmpty(_data[identificationAttributeName]);
	}
});
