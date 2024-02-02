import ApplicationAdapter from '../application/adapter';
import Config from '../../config/environment';

export default ApplicationAdapter.extend({

	session: Ember.inject.service(),

	query(store, type, query)
	{
		if (Em.isEmpty(query.parameters.attributes_filter)) {

			if (!Em.isEmpty(query.parameters)) {

				let newQuery = Em.Object.create({
					limit: query.limit,
					offset: query.offset,
					filter: !Em.isEmpty(query.parameters) ? query.parameters.filter : null,
					roleId: !Em.isEmpty(query.parameters.roleId) ? query.parameters.roleId : null,
					unmatched: !Em.isEmpty(query.parameters.unmatched) ? 1 : 0,
					matched: !Em.isEmpty(query.parameters.matched) ? 1 : 0,
					filter_by_invites: !Em.isEmpty(query.parameters.filter_by_invites) ? query.parameters.filter_by_invites : null
				});

				return this._super(store, type, newQuery);

			}

			return this._super(store, type, query);

		} else {

			let auth = this.get('session').get('data.authenticated');
			return new Ember.RSVP.Promise (function (resolve, reject)
			{
				Ember.$.ajax({

					headers: {
						'access-token': auth['access-token'],
						'client': auth['client'],
						'uid': auth['uid']
					},

					type: 'POST',
					url: this.get('host') + '/' + this.get('namespace') + '/actors/search',
					dataType: 'json',
					data: JSON.stringify(query.parameters.attributes_filter)

				}).then(function (data)
				{
					Ember.run(null, resolve, data);
				}, function (jqXHR)
				{
					jqXHR.then = null; // tame jQuery's ill mannered promises
					Ember.run(null, reject, jqXHR);

				}.bind(this));

			}.bind(this));
		}
	},
	buildURL(modelName, id, snapshot, requestType, query)
	{
		let castingCompanyId = localStorage.getItem('castingCompanyId');
		if(castingCompanyId && query && query.filter){
			return this.get('host') + '/' + this.get('namespace') + '/casting_companies/' + castingCompanyId + '/favourite_actors';
		}
		if (!Em.isEmpty(query)) {
			if (!Em.isEmpty(query.unmatched) && query.unmatched == true) {
				return this.get('host') + '/' + this.get('namespace') + '/roles/' + query.roleId + '/unmatched_actors';
			}

			if (!Em.isEmpty(query.matched) && query.matched == true) {
				return this.get('host') + '/' + this.get('namespace') + '/roles/' + query.roleId + '/matched_actors';
			}
		}

		let entityId = (id) ? '/' + id : '';
		return this.get('host') + '/' + this.get('namespace') + '/actors' + entityId;
	}

});
