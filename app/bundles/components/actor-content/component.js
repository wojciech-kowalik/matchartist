import Ember from 'ember';
import Config from '../../../config/environment';

/**
 * Actor content component
 *
 * @author wkowalik
 * @version 1.0
 */
export default Ember.Component.extend({

	// ------------------
	// General properties

	/** @type {String[]} */
	classNames: ['actor-content'],

	/** @type {Object} */
	store: Ember.inject.service(),

	/** @type {Object} */
	notify: Ember.inject.service(),

	// ------------------
	// Additional properties

	/** @type {String} */
	uri: Config.components["actor-content"].uri,

	/** @type {Boolean} */
	isFavouriteList: false,

	/** @type {Boolean} */
	isFavouriteButton: true,

	/** @type {Boolean} */
	isInvitationButton: true,

	/** @type {String} */
	POST_METHOD: 'POST',

	/** @type {String} */
	FAVOURITE_PATH: 'actor.favourite',

	/** @type {String} */
	AGENT_ACTOR_PATH: 'agent.actor.index',

	init()
	{
		let path = Ember.getOwner(this).lookup('controller:application').currentPath;
		this.set('isFavouriteList', (path === this.get('FAVOURITE_PATH')) ? true : false);
		this.set('isFavouriteButton', (path === this.get('AGENT_ACTOR_PATH')) ? false : true);
		this.set('isInvitationButton', (path === this.get('AGENT_ACTOR_PATH')) ? false : true);
		this.set('backLink', (path === this.get('AGENT_ACTOR_PATH')) ? "agent.actor" : "actor");
		return this._super(...arguments);
	},

	// ------------------
	// Methods

	/**
	 * Get server endpoint url
	 *
	 * @param data
	 * @method getServerEndpoint
	 * @return {string}
	 */
	getServerEndpoint(/** Object **/data)
	{
		let uriString = this.get('uri')
			.replace('{company_id}', data.company_id);

		return Config.APP.API_URL + uriString;
	},

	/**
	 * Do request to service
	 *
	 * @param data
	 * @method doRequest
	 */
	doRequest(/** Object **/data, /** String **/type)
	{
		const url = this.getServerEndpoint(data);

		this.tpAjax.makeRequest(type, url, data, 'json').then(function ()
		{
			this.get('notify').success(this.i18n.t('actor.added.to.favourites').string, {
				radius: true
			});

		}.bind(this), function (error)
		{
			let message = (error.responseText && JSON.parse(error.responseText).message)
				? JSON.parse(error.responseText).message
				: this.i18n.t('general.error.occured').string;

			this.get('notify').error(message, {radius: true});

		}.bind(this));

	},

	/** @type {Object} */
	actions: {

		/**
		 * Add actor to favourite list
		 *
		 * @param value
		 * @param question
		 * @method addToFavourites
		 */
		addToFavourites(/** Actor **/actor)
		{
			this.get('notify').info(this.i18n.t('general.please.wait').string, {
				radius: true
			});

			const data      = {};
			data.company_id = localStorage.getItem('castingCompanyId');
			data.actor_id   = actor.id;

			this.doRequest(data, this.get('POST_METHOD'));

		}

	}

});
