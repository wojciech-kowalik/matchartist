import RESTSerializer from 'ember-data/serializers/rest';
import DS from 'ember-data';
import Ember from 'ember';


export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
	
	keyForAttribute: function (attr)
	{
		return Ember.String.underscore(attr);
	},

	serializeIntoHash: function (hash, type, record, options)
	{
		Ember.merge(hash, this.serialize(record, options));
	},

	normalizeResponse(store, primaryModelClass, payload, id, requestType) {

		let message = "";
		let data    = {actor_invite: []};

		if (payload.message) {
			message = payload.message;
		}

		if (payload._metadata) {

			payload.actors_invites.forEach(function(item, index){
				payload.actors_invites[index].id = item.actor.id;
			});

			data.actor_invite = payload.actors_invites;
			data.meta       = payload._metadata;
			payload         = data;


		}

		return this._super(store, primaryModelClass, payload, id, requestType);
	}
});
