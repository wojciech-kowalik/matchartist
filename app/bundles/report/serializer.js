import RESTSerializer from 'ember-data/serializers/rest';
import DS from 'ember-data';
import Ember from 'ember';

export default RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

	attrs: {
		attribute: {embedded: 'always'}
	},

	keyForAttribute: function (attr)
	{
		return Ember.String.underscore(attr);
	},

	serializeIntoHash: function (hash, type, record, options)
	{
		Ember.merge(hash, this.serialize(record, options));
	},

	normalizeResponse(store, primaryModelClass, payload, id, requestType)
	{
		let reports = [];

		if (Ember.isArray(payload)) {

			payload.forEach(function (item)
			{
				if (!Em.isEmpty(item.id)) {
					reports.push(item);
				}
			});
			payload = {reports};

		}

		return this._super(store, primaryModelClass, payload, id, requestType);
	}


});
