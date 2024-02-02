import TPMedia from '../tp-media/component';

/**
 * Media video component
 *
 * @author wkowalik
 * @version 1.0
 */
const TPMediaVideo = TPMedia.extend({

	// ------------------
	// General properties

	/** @type {String[]} */
	classNames: ['tp-media-video'],

	/** @type {String} */
	category: 'video',

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

		/**
		 * Show video player
		 *
		 * @function
		 */
		showPlayer(/** File **/ file)
		{
			let container = this.$('.thumbnail-' + file.get('id')).parent();
			let video = this.$('<video>');
			let source = this.$('<source>');

			// remove thumbnail
			this.$('.thumbnail-' + file.get('id')).remove();

			// set video DOM element
			video.css('width', '300px');
			video.css('height', '200px');
			video.attr('controls','');
			source.attr('src', file.get('publicUrl'));
			source.attr('type', file.get('mediaType'));
			video.append(source);

			container.append(video);
		}

	}


});

export default TPMediaVideo;
