import RESTSerializer from 'ember-data/serializers/rest';
import DS from 'ember-data';
import Ember from 'ember';

export default RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

//	attrs: {
//		questions: {embedded: 'always'}
//	},

	keyForAttribute: function (attr) {
		return Ember.String.underscore(attr);
	},

	serializeIntoHash: function (hash, type, record, options) {
		Ember.merge(hash, this.serialize(record, options));
	},

	normalizeResponse(store, primaryModelClass, payload, id, requestType) {

		let message = "";
		let questions = [];
		let actor = {};
		let data = {actors: []};

		if(payload.questions){}

		if (payload.questions) {
			questions = payload.questions;
		}

		if (payload._metadata) {

			data.actors = payload.actors;
			data.meta = payload._metadata;
			payload = data;

		} else {

			actor = payload;
			actor.message = message;
			actor.questions = questions;
			payload = {actor};

		}

		return this._super(store, primaryModelClass, payload, id, requestType);
	}

});
