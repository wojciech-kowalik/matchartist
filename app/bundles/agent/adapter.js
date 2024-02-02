import ApplicationAdapter from '../application/adapter';
import Config from '../../config/environment';

export default ApplicationAdapter.extend({

	buildURL(modelName, id, snapshot, requestType, query)
	{
		if(requestType === Config.APP.QUERY){

			if(query.adapter === 'actors'){
				return this.get('host') + '/' + this.get('namespace') + '/agents/me/' + query.adapter;
			}
		}

		return this.get('host') + '/' + this.get('namespace') + '/agents/me';

	}

});
