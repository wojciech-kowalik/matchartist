import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin,{
    
    keyForAttribute: function (attr) {
  		return Ember.String.underscore(attr);
  	},

    normalizeResponse(store, primaryModelClass, payload, id, requestType) {

        payload = {
            attribute: payload
        };

        return this._super(store, primaryModelClass, payload, id, requestType);
    }
});
