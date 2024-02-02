import ApplicationAdapter from '../application/adapter';
import Config from '../../config/environment';

export default ApplicationAdapter.extend({

	buildURL (modelName, id, snapshot, requestType, query)
	{
		let identityData = (id) ? '/' + id: '';
		return this.get('host') + '/' + this.get('namespace') + '/casting_companies' + identityData;
	}

});