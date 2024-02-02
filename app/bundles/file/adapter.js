import ApplicationAdapter from '../application/adapter';
import Config from '../../config/environment';

export default ApplicationAdapter.extend({

	buildURL (modelName, id, snapshot, requestType, query)
	{
		let url = '/users/me/files';

		if(!Ember.isEmpty(query) && query.type === 'actor'){
			url = '/users/' + query.id + '/files';
		}

		if (requestType === Config.APP.DELETE_RECORD || requestType === Config.APP.UPDATE_RECORD) {
			url = '/files/' + id;
		}

		return this.get('host') + '/' + this.get('namespace') + url;
	}

});
