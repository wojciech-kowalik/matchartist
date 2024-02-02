import RESTSerializer from 'ember-data/serializers/rest';
import DS from 'ember-data';
import Ember from 'ember';

export default RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

	attrs: {
		role: {embedded: 'always'}
	},

	keyForAttribute: function (attr) {
		return Ember.String.underscore(attr);
	},

	serializeIntoHash: function (hash, type, record, options) {
		Ember.merge(hash, this.serialize(record, options));
	},

	normalizeResponse(store, primaryModelClass, payload, id, requestType) {

		let message = "";
		let invites = [];
		let invite = {};
		let data = {invites: []};

		if (payload.message) {
			message = payload.message;
		}

		if (payload._metadata) {

			data.invites = payload.invites;
			data.meta = payload._metadata;
			payload = data;

		} else {

			invite = payload;
			invite.message = invite;
			payload = {invite};

		}

		return this._super(store, primaryModelClass, payload, id, requestType);
	}

});
