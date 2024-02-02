import ApplicationAdapter from '../application/adapter';
import Config from '../../config/environment';

export default ApplicationAdapter.extend({

	buildURL (modelName, id, snapshot, requestType, query) {

		let identityData = '';
		let user         = snapshot.record;
		let type         = null;

		if (user) {

			type = user.get('urlType') || Config.APP.USERS_URL_TYPE;

			if (requestType === Config.APP.FIND_RECORD || requestType === Config.APP.UPDATE_RECORD) {

				identityData = (id) ? '/' + id : '';
			}

		} else {

			type = Config.APP.USERS_URL_TYPE;
		}
		return this.get('host') + '/' + this.get('namespace') + '/' + type + identityData;
	}

});
