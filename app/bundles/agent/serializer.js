import RESTSerializer from 'ember-data/serializers/rest';
import DS from 'ember-data';
import Ember from 'ember';

export default RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

	attrs: {
		user: {embedded: 'always'}
	},

	keyForAttribute: function (attr) {
		return Ember.String.underscore(attr);
	},

	serializeIntoHash: function (hash, type, record, options) {
		Ember.merge(hash, this.serialize(record, options));
	},

	normalizeResponse(store, primaryModelClass, payload, id, requestType) {

		let message = "";
		let data = {actors: []};
		let agent = {};
		let agents = [];

		if (payload.message) {
			message = payload.message;
		}

		if (payload._metadata) {

			data.agents = payload.actors;
			data.meta = payload._metadata;
			payload = data;

		}else{

			agent = payload;
			agent.message = message;
			payload = {agent};

		}

		return this._super(store, primaryModelClass, payload, id, requestType);
	}

});
