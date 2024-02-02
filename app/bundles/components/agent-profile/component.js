import Ember from 'ember';
import Config from '../../../config/environment';
import momentComputed from 'ember-moment/computeds/moment';
import fromNow from 'ember-moment/computeds/from-now';
import locale from 'ember-moment/computeds/locale';

export default Ember.Component.extend({

	session: Ember.inject.service(),
	moment: Ember.inject.service(),
	notify: Ember.inject.service(),
	loggedDate: null,
	type: null,
	genders: Config.APP.constans.genders,
	countries: Config.APP.constans.countries,

	init()
	{
		this._super(...arguments);
		this.set('loggedDate', this.get('session').get('data.authenticated').logged);
		this.set('type', this.get('session').get('data.authenticated').role.toUpperCase());
	},

	actions:
	{
		save()
		{
			let role = this.get('session').get('data.authenticated').role;
			let user = this.get('user');
			let model = this.get('user').get(role);
			const self = this;

			self.get('notify').info(self.i18n.t('general.please.wait').string, {radius: true});

			user.save().then(() => {

				//model.save().then(() => {
					self.get('notify').success(self.i18n.t('register.form.congratulations').string, {radius: true});
				//});

			}).catch((error) => {

				this.get('notify').error(error, {radius: true});

			});

		}
	}

});
