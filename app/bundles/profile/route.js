import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ActorAttributeFinder from '../../mixins/actor-attribute-finder';

export default Ember.Route.extend(AuthenticatedRouteMixin, ActorAttributeFinder, {

	notify: Ember.inject.service(),
	session: Ember.inject.service(),
	modelName: 'user',

	model(params)
	{
		const id = this.get('session').get('data.authenticated').id;
		let role = this.get('session').get('data.authenticated').role;

		if ('casting_company' === role) {
			this.set('modelName', 'user');
		}

		if ('actor' === role) {

			let files = {};
			files     = this.get('store').findAll('file', {
				reload: true
			});

			return Em.RSVP.hash({
				profile: this.get('store').findRecord(this.get('modelName'), id),
				attributes: this.get('store').findAll('attribute'),
				actorAttributes: this.get('store').findAll('actorAttribute'),
				files: files
			});

		} else {

			return Em.RSVP.hash({
				profile: this.get('store').findRecord(this.get('modelName'), id),
			});
		}
	},

	afterModel(data)
	{
		const role = this.get('session').get('data.authenticated').role;

		if ('casting_company' === role) {
			let castingCompanys = data.profile.get('castingCompanies');
			if (!Em.isEmpty(castingCompanys)) {
				let castingCompany = castingCompanys.get('firstObject');
				if (!castingCompany.get('isNew')) {
					localStorage.setItem('castingCompanyId', castingCompany.get('id'));
				}
			}
			return;
		}

		let user = data.profile;

		if ('actor' === role) {

			let attributes     = data.attributes;
			let actorAttribute = data.actorAttributes;
			this.getValues(actorAttribute);
			this.getMainAttributes();
		}

		if ('agent' !== role) {

			const roleId = user.get(role + 'Id');

			if (Ember.isNone(roleId)) {
				throw new Error ("Model " + role + " doesn't exists");
			}

			let model = this.get('store').findRecord(role, user.get(role + 'Id'));

			model.then(function (data)
			{
				user.set(role, data);
			});

		}

	},

	actions: {

		refresh() {
			this.refresh();
		}

	},
});
