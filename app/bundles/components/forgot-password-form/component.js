import Ember from 'ember';
import config from '../../../config/environment';
import DS from 'ember-data';
const { service } = Ember.inject;

export default Ember.Component.extend({

	session: service('session'),
	notify: service('notify'),

	didDestroyElement() {

		this.set('errorMessage', null);
		this.set('successMessage', null);
		this.set('infoMessage', null);

	},

	actions: {

		submit(){

			this.set('errorMessage', null);
			this.set('successMessage', null);
			this.set('infoMessage', this.i18n.t('general.please.wait'));

			let user = this.get('user');
			user.set('redirectUrl', config.APP.FRONTEND_URL);

			user.save().then((user)=> {

				this.set('errorMessage', null);
				this.set('infoMessage', null);
				this.get('notify').success(this.i18n.t('register.form.congratulations').string, {radius: true});
				this.set('successMessage', user.get('message'));

			}).catch((error) => {

				this.set('errorMessage', error.errors);
				this.set('infoMessage', null);
				this.get('notify').error(this.i18n.t('register.form.error').string, {radius: true});

			});
		}
	}

});
