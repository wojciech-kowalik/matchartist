import ApplicationAdapter from '../application/adapter';
import config from '../../config/environment';

export default ApplicationAdapter.extend({

	buildURL (modelName, id, snapshot, requestType, query) {

		return this.get('host') + '/' + this.get('namespace') + '/' + '/attributes';
	}
});
