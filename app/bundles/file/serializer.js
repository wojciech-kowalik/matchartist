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
		let file = {};
		let files = [];

		if (payload.message) {
			message = payload.message;
		}

		if (Ember.isArray(payload.data)) {

			files = payload.data;
			files.message = message;
			payload = {files};

		} else {

			file = payload;
			file.message = message;
			payload = {file};
		}

		return this._super(store, primaryModelClass, payload, id, requestType);
	}


});
