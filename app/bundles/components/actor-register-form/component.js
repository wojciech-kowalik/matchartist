import Ember from 'ember';
import Config from '../../../config/environment';
import DS from 'ember-data';

const { service } = Ember.inject;

export default Ember.Component.extend({

	role: 'actor',
	session: service('session'),
	notify: service('notify'),
	showErrors: false,
	sort: ['name:desc'],
	countries: Ember.computed.sort('elements', 'sort'),
	locale: null,
	genders: Config.APP.constans.genders,
	elements: Config.APP.constans.countries,

	didReceiveAttrs()
	{
		this.get('user').set('userCountry', this.i18n.get('locale'));
	},

	didDestroyElement()
	{
		this.set('errorMessage', null);
		this.set('successMessage', null);
		this.set('infoMessage', null);

	},

	actions: {

		/**
		 * Submit user data
		 */
		submit()
		{
			this.set('errorMessage', null);
			this.set('successMessage', null);

			let user = this.get('user');
			user.set('confirmSuccessUrl', Config.APP.FRONTEND_URL);
			user.set('role', this.get('role'));
			user.set('passwordConfirmation', user.get('password'));

			if (!user.get('validations.isValid')) {

				this.set('showErrors', true);
				this.set('errorMessage', this.i18n.t('register.form.error'));
				this.get('notify').error(this.i18n.t('register.form.error').string, {radius: true});
				return;
			}

			this.set('infoMessage', this.i18n.t('general.please.wait'));

			user.save().then((user)=> {

				this.set('errorMessage', null);
				this.set('infoMessage', null);
				this.set('successMessage', this.i18n.t('register.form.congratulations.long'));
				this.get('notify').success(this.i18n.t('register.form.congratulations').string, {radius: true});

			}).catch((error) => {

				this.set('errorMessage', error.errors);
				this.set('infoMessage', null);
				this.get('notify').error(this.i18n.t('register.form.error').string, {radius: true});

			});

		}
	}
});
