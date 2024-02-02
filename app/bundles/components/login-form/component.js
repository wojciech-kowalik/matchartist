import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({

	session: service('session'),
	notify: service('notify'),

	actions: {

		authenticate: function () {

			this.set('infoMessage', this.i18n.t('general.please.wait'));
			this.set('errorMessage', null);

			let { identification, password } = this.getProperties('identification', 'password');

			return this.get('session').authenticate('authenticator:tp', identification, password).catch((error) => {

				this.set('infoMessage', null);

				if (error.errors === undefined) {

					this.get('notify').success(this.i18n.t('general.logged').string, {radius: true});
					this.set('successMessage', this.i18n.t('general.logged'));

				} else {

					this.get('notify').error(this.i18n.t('register.form.error').string, {radius: true});
					this.set('errorMessage', error.errors[0]);
				}

			});
		}
	}
});