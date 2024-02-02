import TPMedia from '../tp-media/component';

/**
 * Media gallery component
 *
 * @author wkowalik
 * @version 1.0
 */
const TPMediaGallery = TPMedia.extend({

	// ------------------
	// General properties

	/** @type {String[]} */
	classNames: ['tp-media-gallery'],

	/** @type {String} */
	category: 'picture',

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
	},

	/**
	 * Event handler
	 *
	 * @function
	 * @return {undefined}
	 */
	didInsertElement()  {

		this._super();
		Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
	},

	/**
	 * Custom callback for after render queue
	 *
	 * @function
	 * @return {undefined}
	 */
	afterRenderEvent()
	{
		const self = this;

		self.$().on('click', '#links img', function (event) {

			event = event || window.event;

			let target = event.target || event.srcElement,
				link = target.src ? target.parentNode : target,
				options = {
					index: link,
					event: event
				};

			blueimp.Gallery(self.$(this).parent().parent().parent().find('a'), options);

		});

	}

});

export default TPMediaGallery;
