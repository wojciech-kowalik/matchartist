import RESTSerializer from 'ember-data/serializers/rest';
import DS from 'ember-data';
import Ember from 'ember';

export default RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

  keyForAttribute: function (attr) {
    return Ember.String.underscore(attr);
  },

	serializeIntoHash: function (hash, type, record, options)
	{
		Ember.merge(hash, this.serialize(record, options));
	},

	normalizeResponse(store, primaryModelClass, payload, id, requestType) {

		let message = "";
		let data    = {castings: []};

		if (payload.message) {
			message = payload.message;
		}

		if (payload._metadata) {

			data.castings = payload.castings;
			data.meta         = payload._metadata;
			payload           = data;

		} else {

			let casting     = {};
			casting         = payload;
			casting.message = message;
			payload         = {casting};

		}

		return this._super(store, primaryModelClass, payload, id, requestType);
	}
});
