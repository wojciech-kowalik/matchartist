import TPMedia from '../tp-media/component';

/**
 * Media uploader component
 *
 * @author wkowalik
 * @version 1.0
 */
const TPMediaUploader = TPMedia.extend({

	// ------------------
	// General properties

	/** @type {String[]} */
	classNames: ['tp-media-uploader'],

	// ------------------
	// Additional properties

	/** @type {Boolean} */
	changeSendMethod: false,

	/** @type {Boolean} */
	isChecked: false,

	/** @type {String} */
	sendMethod: null,

	/** @type {String} */
	type: 'picture',

	/** @type {String} */
	serviceUrl: 'users/me/files',

	/** @type {RegExp} */
	acceptFileTypes: null,

	/** @type {String} */
	POST_METHOD: 'POST',

	/** @type {String} */
	PUT_METHOD: 'PUT',

	/** @type {String} */
	PICTURE_TYPE: 'picture',

	/** @type {String} */
	DOCUMENT_TYPE: 'document',

	/** @type {String} */
	VIDEO_TYPE: 'video',

	/** @type {String} */
	AUDIO_TYPE: 'audio',

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
		this.set('sendMethod', this.get('POST_METHOD'));

		if(this.get('id')){
			this.set('serviceUrl', this.get('serviceUrl').replace('{{id}}', this.get('id')));
		}

		switch (this.get('type')) {

			case this.get('PICTURE_TYPE'):
				this.set('acceptFileTypes', /(\.|\/)(gif|svg|jpe?g|png)$/i);
				break;

			case this.get('VIDEO_TYPE'):
				this.set('acceptFileTypes', /(\.|\/)(mp4|mov|avi|mpg|wmv|webm)$/i);
				break;

			case this.get('AUDIO_TYPE'):
				this.set('acceptFileTypes', /(\.|\/)(mp3|wav|ogg|mp4|aac)$/i);
				break;

			case this.get('DOCUMENT_TYPE'):
				this.set('acceptFileTypes', /(\.|\/)(doc|docx|pdf|txt|ppt|xls|zip|rar|jpe?g)$/i);
				break;
		}
	},

	/**
	 * Event handler
	 *
	 * @function
	 * @return {undefined}
	 */
	willDestroyElement()
	{
		this.$('#file-upload').fileupload('destroy');
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
	 * Event handler
	 *
	 * @function
	 * @return {undefined}
	 */
	willUpdate()
	{
		let method = (this.get('isChecked')) ?
					 this.set('sendMethod', this.get('PUT_METHOD')) :
					 this.set('sendMethod', this.get('POST_METHOD'));

		this.$('#file-upload').fileupload('option', 'method', method);

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

		this.$('#file-upload').fileupload({

			xhrFields: {
				withCredentials: false
			},
			method: this.get('sendMethod'),
			url: this.get('config').uploadServer + this.get('serviceUrl'),
			dataType: 'json',

			headers: {
				"access-token": this.get('session').get('data.authenticated.access-token'),
				"token-type": this.get('session').get('data.authenticated.token-type'),
				"uid": this.get('session').get('data.authenticated.uid'),
				"client": this.get('session').get('data.authenticated.client'),
				"accept": 'json'
			},

			acceptFileTypes: this.get('acceptFileTypes'),

			/**
			 * @override
			 */
			getFilesFromResponse: function (data)
			{
				let isPicture = false;

				if (self.get('type') === self.get('PICTURE_TYPE')) {
					if (data.result.mime_type.match(self.get('acceptFileTypes')) !== null) {
						isPicture = true;
					}
				}
				if (data.result) {
					data.result.is_picture = isPicture;
					return data.result;
				}
				return [];
			},

			/**
			 * @override
			 */
			add: function (e, data)
			{
				if (e.isDefaultPrevented()) {
					return false;
				}

				var $this   = $ (this),
					that    = $this.data('blueimp-fileupload') ||
						$this.data('fileupload'),
					options = that.options;

				data.files.forEach(function (element, index)
				{
					data.files[index].iconFile = false;

					$ (this).find('.size').text(
						that._formatFileSize(data.files[index].size)
					);

					self.get('mimeTypeIcons').forEach(function (item)
					{
						if (item[data.files[index].type] !== undefined) {
							data.files[index].iconFile = item[data.files[index].type];
						}

					});

				});

				data.context = that._renderUpload(data.files)
					.data('data', data)
					.addClass('processing');

				options.filesContainer[
					options.prependFiles ? 'prepend' : 'append'
					] (data.context);

				that._forceReflow(data.context);
				that._transition(data.context);

				data.process(function ()
				{
					return $this.fileupload('process', data);

				}).always(function ()
				{
					data.context.each(function (index)
					{
						data.files[index].iconFile = false;

						$ (this).find('.size').text(
							that._formatFileSize(data.files[index].size)
						);

					}).removeClass('processing');

					that._renderPreviews(data);

				}).done(function ()
				{
					data.context.find('.start').prop('disabled', false);

					if ((that._trigger('added', e, data) !== false) &&
						(options.autoUpload || data.autoUpload) &&
						data.autoUpload !== false) {
						data.submit();
					}

				}).fail(function ()
				{
					if (data.files.error) {

						data.context.each(function (index)
						{

							var error = data.files[index].error;
							if (error) {
								$ (this).find('.error').text(error);
							}
						});
					}
				});
			},

			/**
			 * @override
			 */
			done: function (e, data)
			{
				if (e.isDefaultPrevented()) {
					return false;
				}

				var that                 = $ (this).data('blueimp-fileupload') || $ (this).data('fileupload'),
					getFilesFromResponse = data.getFilesFromResponse || that.options.getFilesFromResponse,
					file                 = getFilesFromResponse (data), template, deferred;

				$ (this).find('.files').empty();

				template = that._renderDownload([file])[
					that.options.prependFiles ? 'prependTo' : 'appendTo'
					] (that.options.filesContainer);

				that._forceReflow(template);

				deferred = that._addFinishedDeferreds();

				that._transition(template).done(

					function ()
					{
						data.context = $ (this);
						that._trigger('completed', e, data);
						that._trigger('finished', e, data);
						self.get('notify').success(self.i18n.t('general.item.saved').string, {radius: true});
						deferred.resolve();

						Ember.run.later((() => {
							self.sendAction('refresh');
						}), 2000);

					}
				);

			}

		});

	}

});

export default TPMediaUploader;