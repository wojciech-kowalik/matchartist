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
		let data = {messages: []};

		if (payload.message) {
			message = payload.message;
		}

		if (payload._metadata) {

			data.messages = payload.messages;

			if (Ember.isArray(data.messages)) {

				data.messages.forEach((item, key) => {
					data.messages[key].user = item.sender_user;
				});

			}

			data.meta = payload._metadata;
			payload = data;

		} else {

			let message = {};
			message = payload;
			message.message = message;
			payload = {message};

		}

		return this._super(store, primaryModelClass, payload, id, requestType);
	}

});
