import ApplicationAdapter from '../application/adapter';
import Config from '../../config/environment';

export default ApplicationAdapter.extend({

	session: Ember.inject.service(),

	buildURL(modelName, id, snapshot, requestType, query)
	{
		let role = this.get('session').get('data.authenticated').role;
		let uri = null;

		switch(role){

			case Config.APP.CASTING_COMPANY_ROLE:
				uri = '/casting_companies/'+localStorage.getItem('castingCompanyId')+'/avatar';
				break;

			case Config.APP.ACTOR_ROLE:
			case Config.APP.AGENT_ROLE:
				uri = '/users/me/avatar';
				break;
		}

		return this.get('host') + '/' + this.get('namespace') + uri;
	}

});
