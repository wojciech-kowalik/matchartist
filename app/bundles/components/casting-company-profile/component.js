import Ember from 'ember';
import Config from '../../../config/environment';
import momentComputed from 'ember-moment/computeds/moment';
import fromNow from 'ember-moment/computeds/from-now';
import locale from 'ember-moment/computeds/locale';

/**
 * Profile casting company component
 *
 * @author wkowalik
 * @version 1.0
 */
export default Ember.Component.extend({

	// ------------------
	// General properties

	/** @type {Object} */
	session: Ember.inject.service(),

	/** @type {Object} */
	moment: Ember.inject.service(),

	/** @type {Object} */
	notify: Ember.inject.service(),

	/** @type {Object} */
	store: Ember.inject.service(),

	// ------------------
	// Additional properties

	/** @type {String} */
	loggedDate: null,

	/** @type {String} */
	type: null,

	/** @type {Boolean} */
	showErrors: false,

	/** @type {Object} */
	castingCompany: null,

	init()
	{
		this._super(...arguments);
		this.set('loggedDate', this.get('session').get('data.authenticated').logged);
		this.set('type', this.get('session').get('data.authenticated').role.toUpperCase().replace('_', ' '));
	},

	// ------------------
	// Events

	/**
	 * Event handler
	 *
	 * @function
	 * @return {undefined}
	 */
	didReceiveAttrs()
	{
		this.set('errorMessage', null);

		let user = this.get('user');

		// get first casting company on the list
		this.set('castingCompany', user.get('castingCompanies').get('firstObject'));

		console.log(this.get('castingCompany.website'));

		if (!this.get('castingCompany')) {

			this.set('castingCompany', this.get('store').createRecord('casting-company'));
			this.set('errorMessage', 'Please add casting company data');
		}
	},

	// ------------------
	// Actions

	/** @type {Object} */
	actions: {

		/**
		 * Save casting company data
		 *
		 * @function
		 */
		saveCastingCompany()
		{
			if (!this.get('castingCompany').get('validations.isValid')) {

				this.set('showErrors', true);
				this.set('errorMessage', this.i18n.t('register.form.error'));
				this.get('notify').error(this.i18n.t('register.form.error').string, {radius: true});
				return;
			}

			this.get('notify').info(this.i18n.t('general.please.wait').string, {radius: true});

			this.get('castingCompany').save().then((response) =>
			{
				localStorage.setItem('castingCompanyId', response.get('id'));
				this.get('notify').success(this.i18n.t('register.form.congratulations').string, {radius: true});
				this.set('errorMessage', null);

			}).catch((error) =>
			{
				this.get('notify').error(this.i18n.t('register.form.error').string, {radius: true});

			});

		},

		/**
		 * Save casting company representant data
		 *
		 * @function
		 */
		save()
		{
			let role   = this.get('session').get('data.authenticated').role;
			let user   = this.get('user');
			let model  = this.get('user').get(role);
			const self = this;

			self.get('notify').info(self.i18n.t('general.please.wait').string, {radius: true});

			user.save().then(() =>
			{
				self.get('notify').success(self.i18n.t('register.form.congratulations').string, {radius: true});

			}).catch((error) =>
			{
				this.get('notify').error(error, {radius: true});

			});

		}
	}

});
