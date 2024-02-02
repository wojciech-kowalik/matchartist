import Ember from 'ember';
import Config from '../../config/environment';
import ApplicationAdapter from '../application/adapter';

export default ApplicationAdapter.extend({

  buildURL(modelName, id, snapshot, requestType, query)
  {
    let castingId;
    let stageId;
    if (requestType == Config.APP.CREATE_RECORD) {
      castingId = snapshot.record.get('castingId');
      stageId   = snapshot.record.get('stageId');
      return this.get('host') + '/' + this.get('namespace') + '/castings/'+castingId+'/stages/'+stageId+'/hearings';
    } else if (requestType == Config.APP.UPDATE_RECORD) {
      castingId = snapshot.record.get('castingId');
      stageId   = snapshot.record.get('stageId');
      return this.get('host') + '/' + this.get('namespace') + '/castings/'+castingId+'/stages/'+stageId+'/hearings';
    } else if (requestType == Config.APP.DELETE_RECORD) {
      return this.get('host') + '/' + this.get('namespace') + '/hearings/'+id ;
    } else {
      castingId = query.castingId;
      stageId   = query.stageId;
      return this.get('host') + '/' + this.get('namespace') + '/castings/'+castingId+'/stages/'+stageId+'/hearings';
    }
  }
  
});
