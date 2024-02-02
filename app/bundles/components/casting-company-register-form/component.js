import Ember from 'ember';
import Config from '../../../config/environment';
import DS from 'ember-data';

const { service } = Ember.inject;

export default Ember.Component.extend({

	role: 'casting_company',
	session: service ('session'),
	notify: service ('notify'),
	showErrors: false,

	willRender()
	{
		this.set('locale', this.i18n.get('locale'));
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
			let self = this;
			user.set('confirmSuccessUrl', Config.APP.FRONTEND_URL);
			user.set('role', this.get('role'));
			user.set('passwordConfirmation', user.get('password'));
			user.set('birthDate', moment ().format('YYYY-MM-DD'));
			user.set('userCountry', this.get('locale'));
			user.set('gender', 'm');

			if (!user.get('validations.isValid')) {

				this.set('showErrors', true);
				this.set('successMessage', this.i18n.t('register.form.congratulations.long'));
				this.get('notify').error(this.i18n.t('register.form.error').string, {radius: true});
				return;
			}

			this.set('infoMessage', this.i18n.t('general.please.wait'));

			user.save().then((user)=>
			{

				this.set('errorMessage', null);
				this.set('infoMessage', null);
				this.set('successMessage', this.i18n.t('register.form.congratulations.long'));
				this.get('notify').success(this.i18n.t('register.form.congratulations').string, {radius: true});

			}).catch((error) =>
			{

				this.set('errorMessage', error.errors);
				this.set('infoMessage', null);
				this.get('notify').error(this.i18n.t('register.form.error').string, {radius: true});

			});

		}
	}
});
