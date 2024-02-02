import ApplicationAdapter from '../application/adapter';
import config from '../../config/environment';

export default ApplicationAdapter.extend({
  buildURL (modelName, id, snapshot, requestType, query) {
    let actorId = (!Ember.isEmpty(query) && !Ember.isEmpty(query.id)) ?  query.id : 'me';
		return this.get('host') + '/' + this.get('namespace') + '/actors/' + actorId + '/attributes';
	}
});
