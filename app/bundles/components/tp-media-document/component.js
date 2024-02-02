import TPMedia from '../tp-media/component';

/**
 * Media document component
 *
 * @author wkowalik
 * @version 1.0
 */
const TPMediaDocument = TPMedia.extend({

	// ------------------
	// General properties

	/** @type {String[]} */
	classNames: ['tp-media-document'],

	/** @type {String} */
	category: 'document',

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
	}


});

export default TPMediaDocument;
