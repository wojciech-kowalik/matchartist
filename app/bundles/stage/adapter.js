import ApplicationAdapter from '../application/adapter';
import Config from '../../config/environment';

export default ApplicationAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
      if (requestType == Config.APP.DELETE_RECORD) {
        let castingId = snapshot.record.get('castingId');
        return this.get('host') + '/' + this.get('namespace') + '/castings/' + castingId + '/stages';
      } else if (requestType == Config.APP.CREATE_RECORD) {
        let castingId = snapshot.record.get('castingId');
        return this.get('host') + '/' + this.get('namespace') + '/castings/' + castingId + '/stages';
      } else if (requestType == Config.APP.UPDATE_RECORD) {
        let castingId = snapshot.record.get('castingId');
        return this.get('host') + '/' + this.get('namespace') + '/castings/' + castingId + '/stages';
      } else {
        return this.get('host') + '/' + this.get('namespace') + '/castings/' + query.castingId + '/stages';
      }

  }
});
