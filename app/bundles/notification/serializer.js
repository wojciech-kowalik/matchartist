import RESTSerializer from 'ember-data/serializers/rest';
import DS from 'ember-data';
import Ember from 'ember';

export default RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

	keyForAttribute: function (attr) {
		return Ember.String.underscore(attr);
	},

	serializeIntoHash: function (hash, type, record, options) {
		Ember.merge(hash, this.serialize(record, options));
	},

	normalizeResponse(store, primaryModelClass, payload, id, requestType) {

		let message = "";
		let data = {notifications: []};

		if (payload.message) {
			message = payload.message;
		}

		if (payload._metadata) {

			data.notifications = payload.notifications;
			data.meta = payload._metadata;
			payload = data;

		} else {

			let notification = {};
			notification = payload;
			notification.message = notification;
			payload = {notification};

		}

		return this._super(store, primaryModelClass, payload, id, requestType);
	}

});
