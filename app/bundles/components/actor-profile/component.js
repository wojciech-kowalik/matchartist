import Ember from 'ember';
import Config from '../../../config/environment';
import momentComputed from 'ember-moment/computeds/moment';
import fromNow from 'ember-moment/computeds/from-now';
import locale from 'ember-moment/computeds/locale';

export default Ember.Component.extend({

	session: Ember.inject.service(),
	moment: Ember.inject.service(),
	notify: Ember.inject.service(),
	store: Ember.inject.service(),

	// ------------------
	// Additional properties

	/** @type {String} */
	uri: Config.components["actor-profile-request-agent"].uri,

	loggedDate: null,
	genders: Config.APP.constans.genders,
	countries: Config.APP.constans.countries,
	userCountryName: null,

	init()
	{
		this._super(...arguments);
		this.set('loggedDate', this.get('session').get('data.authenticated').logged);
	},

	didReceiveAttrs()
	{
		let userCountry = this.get('countries').filter(
				country => country.value === this.get('user.actor.userCountry')
		);
		if (!Em.isEmpty(userCountry[0])) {
			this.set('userCountryName', userCountry[0].label);
		}
	},

	actions:
	{
		/**
		 * Save user data
		 */
		save()
		{
			let role = this.get('session').get('data.authenticated').role;
			let user = this.get('user');
			let model = user.get(role);
			const self = this;

			self.get('notify').info(self.i18n.t('general.please.wait').string, {radius: true});

			user.save().then(() => {

				model.save().then(() => {

					self.get('notify').success(self.i18n.t('register.form.congratulations').string, {radius: true});
				});

			}).catch((error) => {

				this.get('notify').error(error, {radius: true});

			});

		},

		hireAgent()
		{
			this.tpAjax.makeRequest('POST', Config.APP.API_URL + this.get('uri'), {}, 'json').then(function() {
				this.get('notify').success(this.i18n.t('actor.profile.agent.request.success').string, {
					radius: true
				});
			}.bind(this), function(error) {
				this.get('notify').error(this.i18n.t('actor.profile.agent.request.error').string, {
					radius: true
				});
			}.bind(this));
		}


	}

});
