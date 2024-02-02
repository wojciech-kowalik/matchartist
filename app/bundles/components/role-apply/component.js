import Ember from 'ember';
import Config from '../../../config/environment';

/**
 * Role apply component
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
	classNames: ['role-apply'],

	// ------------------
	// Additional properties

	/** @type {String} */
	uri: Config.components["role-apply"].uri,

	// ------------------
	// Methods

	/**
	 * Get server endpoint url
	 *
	 * @param role
	 * @param hearing
	 * @function
	 * @return {string}
	 */
	getServerEndpoint(/** Object **/role, /** Object **/hearing)
	{
		let uriString = this.get('uri')
			.replace('{role_id}', role.get('id'))
			.replace('{hearing_id}', hearing.get('id'));

		return Config.APP.API_URL + uriString;
	},

	/**
	 *
	 * @param string
	 * @returns {string}
	 */
	capitalizeFirstLetter(string)
	{
		return string[0].toUpperCase() + string.slice(1);
	},

	/**
	 * Do request to service
	 *
	 * @param data
	 * @param question
	 * @function
	 */
	doRequest(model)
	{
		let hearingDateId = this.$().find('.hearing-date:checked').val();
		let hearing       = null;
		let data          = {};
		let movies        = this.$().find('.select-video:checked');
		let files         = [];

		if (movies.length > 0) {

			movies.each(function (index, item)
			{
				files.push($ (item).data('id'));
			});
		}

		if (Ember.isEmpty(hearingDateId)) {

			this.get('notify').error(this.i18n.t('role.choose.hearing.date').string, {
				radius: true
			});

			return;
		}

		model.role.get('hearings').forEach(function (item, index)
		{
			if (+item.get('id') === +hearingDateId) {
				hearing = item;
			}
		});

		const url = this.getServerEndpoint(model.role, hearing);

		data.role_id    = model.role.get('id');
		data.hearing_id = hearing.get('id');

		if (!Ember.isEmpty(files)) {
			data.files = files.join(',');
		}

		this.tpAjax.makeRequest('POST', url, data, 'json').then(function ()
		{
			this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
				radius: true
			});

		}.bind(this), function (error)
		{
			let message = (this.capitalizeFirstLetter(JSON.parse(error.responseText).message))
				? this.capitalizeFirstLetter(JSON.parse(error.responseText).message)
				: this.i18n.t('role.apply.error').string;

			this.get('notify').error(message, {
				radius: true
			});

		}.bind(this));

	},

	// ------------------
	// Actions

	/** @type {Object} */
	actions: {

		/**
		 * Attend to role
		 *
		 * @function
		 * @return {void}
		 */
		apply()
		{
			this.doRequest(this.get('model'));
		},

		/**
		 * @function
		 */
		backToPrevious()
		{
			window.history.back();
		}
	}
});
