import TPMedia from '../tp-media/component';

/**
 * Media audio component
 *
 * @author wkowalik
 * @version 1.0
 */
const TPMediaAudio = TPMedia.extend({

	// ------------------
	// General properties

	/** @type {String[]} */
	classNames: ['tp-media-audio'],

	/** @type {String} */
	category: 'audio',

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
		this._super(...arguments);
		this.filterFiles();

		let filtered = this.get('filteredFiles');

		if (filtered.length) {

			this.get('mimeTypeIcons').forEach((item, index) =>
			{
				filtered.forEach((filter, index) =>
				{
					if (item[filter.get('mimeType')]) {
						filter.set('icon', item[filter.get('mimeType')]);
					}

				});

			});

		}

	},

	/**
	 * Event handler
	 *
	 * @function
	 * @return {undefined}
	 */
	didInsertElement()
	{
		this._super();
		Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
	},

	/**
	 * Custom callback for after render queue
	 *
	 * @function
	 * @return {undefined}
	 */
	afterRenderEvent(){

	},

	/** @type {Object} */
	actions: {


	}


});

export default TPMediaAudio;
