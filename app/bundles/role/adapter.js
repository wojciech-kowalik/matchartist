import Ember from 'ember';
import Config from '../../config/environment';
import ApplicationAdapter from '../application/adapter';

export default ApplicationAdapter.extend({

	query(store, type, query) {

		if (!Em.isEmpty(query) && !Em.isEmpty(query.parameters)) {
    	let newQuery = Em.Object.create({
       	limit : query.limit,
       	offset : query.offset,
    	});
			if (!Em.isEmpty(query.parameters.url)) {
				newQuery.set('url', query.parameters.url);
			}
			if (!Em.isEmpty(query.parameters.filter_by)) {
				newQuery.set('filter_by', query.parameters.filter_by);
			}
			return this._super(store, type, newQuery);
		} else {
			return this._super(store, type, query);
		}

  },

	buildURL(modelName, id, snapshot, requestType, query)
	{
		let castingId = null;

		if (!Em.isEmpty(query) && query.url === 'me') {
				return this.get('host') + '/' + this.get('namespace') + '/actors/me/roles/';
		}
		if (requestType === Config.APP.CREATE_RECORD) {
			castingId = snapshot.record.get('castingId');
			return this.get('host') + '/' + this.get('namespace') + '/castings/' + castingId + '/roles';
		} else if (requestType === Config.APP.UPDATE_RECORD) {

			return this.get('host') + '/' + this.get('namespace') + '/roles/' + id;
		} else if (requestType === Config.APP.FIND_RECORD) {

			return this.get('host') + '/' + this.get('namespace') + '/roles/' + id;
		} else {
			castingId = query.castingId;
			return this.get('host') + '/' + this.get('namespace') + '/castings/' + castingId + '/roles';
		}
	}

});
