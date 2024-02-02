import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

	moment: Ember.inject.service(),
	i18n: Ember.inject.service(),

	beforeModel() {
		this.get('moment').changeLocale(this.get('i18n.locale'));
	},

	// ------------------
	// Actions

	/** @type {Object} */
	actions: {

		/**
		 * Logout from application
		 * @method logout
		 */
		logout()
		{
			localStorage.removeItem('castingCompanyId');
			this.get('session').invalidate();
		},

		/**
		 * @method backToPrevious
		 */
		backToPrevious()
		{
			window.history.back();
		},

		/**
		 * Show modal renderer
		 *
		 * @param name element name
		 * @param model data
		 * @method showModal
		 */
		showModal(name, model, action)
		{
			if(action) {
				model.action = action;
			}

			this.render(name, {
				into: 'application',
				outlet: 'modal',
				model: model
			});
		},

		/**
		 * Close modal from view
		 *
		 * @method closeModal
		 */
		closeModal()
		{
			this.disconnectOutlet({
				outlet: 'modal',
				parentView: 'application'
			});
		}
	}

});
