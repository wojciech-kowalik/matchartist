import ApplicationAdapter from '../application/adapter';
import Config from '../../config/environment';

export default ApplicationAdapter.extend({

	buildURL(modelName, id, snapshot, requestType, query)
	{
		let castingCompanyId = localStorage.getItem('castingCompanyId', castingCompanyId);

		if (requestType === Config.APP.DELETE_RECORD) {

			return this.get('host') + '/' + this.get('namespace') + '/castings/' + id;

		} else if (requestType == Config.APP.UPDATE_RECORD) {

			return this.get('host') + '/' + this.get('namespace') + '/castings/' + id;

		} else {

			return this.get('host') + '/' + this.get('namespace') + '/casting_companies/' + castingCompanyId + '/castings';
		}
	}
});
