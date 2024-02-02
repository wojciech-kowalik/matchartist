import RESTSerializer from 'ember-data/serializers/rest';
import DS from 'ember-data';
import Ember from 'ember';

export default RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

	attrs: {
		role: {embedded: 'always'}
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
		if (Em.isArray(payload)) {
			payload = {hearings: payload};
		} else {
			payload = {hearing: payload};
		}

		return this._super(store, primaryModelClass, payload, id, requestType);
	}
  
});
