import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';
import Config from '../../../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {

	tpActorAttributeFilter: Ember.inject.service(),
	notify: Ember.inject.service(),
	session: Ember.inject.service(),

	// ------------------
	// Additional properties

	/** @type {String} */
	uri: Config.components["actor-content"].uri,

	/** @type {String} */
	DELETE_METHOD: 'DELETE',

	// ------------------
	// Methods

	/**
	 * ResetScrollMixin method
	 *
	 * @override
	 */
	activate: function ()
	{
		let role             = this.get('session').get('data.authenticated').role;
		let castingCompanyId = localStorage.getItem('castingCompanyId', castingCompanyId);
		if ('casting_company' === role && !castingCompanyId) {
			this.transitionTo('profile');
			this.get('notify').error('Please fill casting company data !', {radius: true});
		}
		this._super.apply(this, arguments);
	},

	/**
	 * Get server endpoint url
	 *
	 * @param role
	 * @param actor
	 * @param question
	 * @method getServerEndpoint
	 * @return {string}
	 */
	getServerEndpoint(/** Object **/data)
	{
		let uriString = this.get('uri')
			.replace('{company_id}', data.company_id);

		return Config.APP.API_URL + uriString + '/' + data.actor_id;
	},

	/**
	 * Do request to service
	 *
	 * @param data
	 * @method doRequest
	 */
	doRequest(/** Object **/data, /** Object **/model)
	{
		const url = this.getServerEndpoint(data);

		this.tpAjax.makeRequest(this.get('DELETE_METHOD'), url, data, 'json').then(function ()
		{
			this.get('notify').success(this.i18n.t('actor.removed.from.favourites').string, {
				radius: true
			});

			model.action();

		}.bind(this), function (error)
		{
			let message = (error.responseText && JSON.parse(error.responseText).message)
				? JSON.parse(error.responseText).message
				: this.i18n.t('general.error.occured').string;

			this.get('notify').error(message, {radius: true});

		}.bind(this));

	},

	/**
	 * Remove actor from favourite list
	 *
	 * @param value
	 * @param question
	 * @method removeFromFavourites
	 */
	removeFromFavourites(model)
	{
		this.get('notify').info(this.i18n.t('general.please.wait').string, {
			radius: true
		});

		const data      = {};
		data.company_id = localStorage.getItem('castingCompanyId');
		data.actor_id   = model.id;

		this.doRequest(data, model);

	},

	// ------------------
	// Actions

	/** @type {Object} */
	actions: {

		show(model) {
		},

		custom(model) {
		},

		delete(model) {
			this.removeFromFavourites(model);
		}
	}
});
