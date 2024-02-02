import Ember from 'ember';
import Config from '../../../config/environment';

/**
 * Media general component
 *
 * @author wkowalik
 * @version 1.0
 */
const TPMedia = Ember.Component.extend({

	// ------------------
	// General properties

	/** @type {Object} */
	session: Ember.inject.service(),

	/** @type {Object} */
	notify: Ember.inject.service(),

	// ------------------
	// Additional properties

	/** @type {String} */
	config: Config.components["tp-media"],

	/** @type {Object[]} */
	filteredFiles: [],

	/** @type {String} */
	category: null,

	/** @type {Number} */
	counter: 0,

	/** @type {Boolean} */
	isShowMode: false,

	/** @type {Object[]},
	 *  @access private */
	mimeTypeIcons: [

		// document
		{'application/msword': 'file-word-o'},
		{'application/pdf': 'file-pdf-o'},
		{'text/plain': 'file-text-o'},
		{'application/mspowerpoint': 'file-powerpoint-o'},
		{'application/powerpoint': 'file-powerpoint-o'},
		{'application/vnd.ms-powerpoint': 'file-powerpoint-o'},
		{'application/x-mspowerpoint': 'file-powerpoint-o'},
		{'application/excel': 'file-excel-o'},
		{'application/vnd.ms-excel': 'file-excel-o'},
		{'application/x-excel': 'file-excel-o'},
		{'application/CDFV2-encrypted': 'file'},
		{'application/x-msexcel': 'file-excel-o'},
		{'application/x-compressed': 'file-archive-o'},
		{'application/x-zip-compressed': 'file-archive-o'},
		{'application/zip': 'file-archive-o'},
		{'multipart/x-zip': 'file-archive-o'},
		{'application/x-rar-compressed': 'file-archive-o'},
		{'application/octet-stream': 'file-archive-o'},

		// video
		{'video/mp4': 'file-video-o'},
		{'video/quicktime': 'file-video-o'},
		{'video/x-msvideo': 'file-video-o'},
		{'video/mpeg': 'file-video-o'},
		{'video/x-ms-wmv': 'file-video-o'},
		{'video/webm': 'file-video-o'},
		{'video/ogg': 'file-video-o'},

		// audio
		{'audio/mpeg3': 'file-sound-o'},
		{'audio/x-mpeg-3': 'file-sound-o'},
		{'audio/wav': 'file-sound-o'},
		{'audio/x-wav': 'file-sound-o'},
		{'audio/aac': 'file-sound-o'},
		{'audio/mp4': 'file-sound-o'},
		{'audio/mpeg': 'file-sound-o'},
		{'audio/ogg': 'file-sound-o'}

	],

	// ------------------
	// Methods

	/**
	 * Filters files by category
	 *
	 * @function
	 * @return {undefined}
	 */
	filterFiles()
	{
		this.set('filteredFiles',
			this.get('files').filter(
				(item, index, self) => item.get('category') === this.get('category')
			)
		);

		this.set('counter', this.get('filteredFiles').length);
	},

	/** @type {Object} */
	actions: {

		/**
		 * Delete element
		 *
		 * @function
		 */
		delete(/** File **/ file)
		{
			const self = this;

			self.get('notify').info(self.i18n.t('general.please.wait').string, {radius: true});

			file.destroyRecord().then(function (response, data)
			{

				self.get('notify').success(self.i18n.t('general.item.deleted').string, {radius: true});
				self.$('.item-' + file.get('id')).detach();
				self.set('counter', +self.get('counter') - 1);

			});

		},

		/**
		 * Update element
		 *
		 * @function
		 */
		update(/** File **/ file)
		{
			const self = this;

			self.get('notify').info(self.i18n.t('general.please.wait').string, {radius: true});
			self.$('.item-' + file.get('id')).find('input').css('border', '1px dashed #ff5f5f');

			file.save().then(function (response, data)
			{
				self.get('notify').success(self.i18n.t('general.item.saved').string, {radius: true});
				self.$('.item-' + file.get('id')).find('input').css('border', '1px solid #e6eaea');

			});

		}

	}

});

export default TPMedia;