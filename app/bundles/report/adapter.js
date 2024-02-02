import Ember from 'ember';
import Config from '../../config/environment';
import ApplicationAdapter from '../application/adapter';

export default ApplicationAdapter.extend({

	buildURL(modelName, id, snapshot, requestType, query)
	{

		if(query.roleId && query.actorId){
			return this.get('host') + '/' + this.get('namespace') + '/actors/' + query.actorId + '/roles/' + query.roleId + '/matching_report';
		}

	}

});
