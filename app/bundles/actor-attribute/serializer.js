import RESTSerializer from 'ember-data/serializers/rest';
import DS from 'ember-data';
import Ember from 'ember';


export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

	normalizeResponse(store, primaryModelClass, payload, id, requestType)
	{
		let message         = "";
		let actorAttribute  = {};
		let actorAttributes = [];

		if (payload.message) {
			message = payload.message;
		}

		if (Ember.isArray(payload)) {

			payload.forEach(function (item)
			{
				if (!Em.isEmpty(item.id)) {
					actorAttributes.push(item);
				}
			});
			actorAttributes.message = message;
			payload                 = {actorAttributes};

		} else {
			actorAttribute         = payload;
			actorAttribute.message = message;
			payload                = {actorAttribute};
		}
		return this._super(store, primaryModelClass, payload, id, requestType);
	}
});
