import Ember from 'ember';
import Config from '../../config/environment';
import ApplicationAdapter from '../application/adapter';

export default ApplicationAdapter.extend({

  query(store, type, query) {
    if (!Em.isEmpty(query.parameters)) {
      let newQuery = Em.Object.create({
        limit: query.limit,
        offset: query.offset,
        roleId: !Em.isEmpty(query.parameters.roleId) ? query.parameters.roleId : null,
      });
      return this._super(store, type, newQuery);
    } else {
      return this._super(store, type, query);
    }

  },

  buildURL(modelName, id, snapshot, requestType, query) {
    if (!Em.isEmpty(query.hearingId)) {
      return this.get('host') + '/' + this.get('namespace') + '/hearings/' + query.hearingId + '/appointments/' + query.appointmentId;
    } else {
      return this.get('host') + '/' + this.get('namespace') + '/roles/' + query.roleId + '/appointments';
    }
    //GET /hearings/{hearing_id}/appointments/{appointment_id}

  }

});
