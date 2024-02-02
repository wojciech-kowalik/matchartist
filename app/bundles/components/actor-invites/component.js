import Ember from 'ember';
import Config from '../../../config/environment';

/**
 * Actor invites component
 *
 * @author wkowalik
 * @version 1.0
 */
export default Ember.Component.extend({

	// ------------------
	// General properties

	/** @type {Object} */
	store: Ember.inject.service(),

	/** @type {Object} */
	notify: Ember.inject.service(),

	/** @type {String[]} */
	classNames: ['actor-invites'],

	// ------------------
	// Additional properties

	/** @type {String} */
	uri: Config.components["actor-invites"].uri,

	// ------------------
	// Methods

	/**
	 * Get server endpoint url
	 *
	 * @param role
	 * @param id
	 * @method getServerEndpoint
	 * @return {string}
	 */
	getServerEndpoint(/** Object **/id)
	{
		let uriString = this.get('uri')
			.replace('{actor_id}', id);

		return Config.APP.API_URL + uriString;
	},

	/**
	 * Do request to service
	 *
	 * @param data
	 * @param question
	 * @method doRequest
	 */
	doRequest(model)
	{
		let chosenRoleId = this.$().find('.chosen-role:checked').val();
		let data         = {};
		let role         = {};

		this.get('notify').info(this.i18n.t('general.please.wait').string, {
			radius: true
		});

		if (Ember.isEmpty(chosenRoleId)) {

			this.get('notify').error(this.i18n.t('role.choose').string, {
				radius: true
			});

			return;
		}

		model.forEach(function (casting, index)
		{
			casting.get('roles').forEach(function (item, index)
			{
				if (+item.id === +chosenRoleId) {
					role = item;
				}

			});

		});

		data.role_id  = chosenRoleId;
		data.actor_id = this.get('id');

		const url = this.getServerEndpoint(this.get('id'));

		this.tpAjax.makeRequest('POST', url, data, 'json').then(function ()
		{
			this.get('notify').success(this.i18n.t('actor.invited').string, {
				radius: true
			});

		}.bind(this), function (error)
		{
			this.get('notify').error(this.i18n.t('general.error.occured').string, {
				radius: true
			});

		}.bind(this));

	},

	// ------------------
	// Actions

	/** @type {Object} */
	actions: {

		/**
		 * Invites actor
		 *
		 * @method invites
		 * @return {void}
		 */
		invites()
		{
			this.doRequest(this.get('model'));
		}
	}
});
