import ApplicationAdapter from '../application/adapter';
import Config from '../../config/environment';

export default ApplicationAdapter.extend({

	buildURL(modelName, id, snapshot, requestType, query)
	{
		if (!Em.isEmpty(query) && !Em.isEmpty(query.roleId)) {

			// get actor role questions
			if(!Ember.isEmpty(query) && !Ember.isEmpty(query.roleId) && !Ember.isEmpty(query.actorId)){
				return this.get('host') + '/' + this.get('namespace') + '/roles/' + query.roleId + '/actors/' + query.actorId + '/questions';
			}

			return this.get('host') + '/' + this.get('namespace') + '/roles/' + query.roleId + '/questions';

		} else {

			let roleId = snapshot.record.get('roleId');
			let id     = snapshot.record.get('id');

			if (requestType === Config.APP.CREATE_RECORD) {

				return this.get('host') + '/' + this.get('namespace') + '/roles/' + roleId + '/questions';

			} else if (requestType === Config.APP.DELETE_RECORD) {

				return this.get('host') + '/' + this.get('namespace') + '/roles/' + roleId + '/questions/' + id;

			} else if (requestType === Config.APP.UPDATE_RECORD) {

				return this.get('host') + '/' + this.get('namespace') + '/roles/' + roleId + '/questions/' + id;

			}
		}
	}
});
