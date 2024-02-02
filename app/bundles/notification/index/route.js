import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';
import Config from '../../../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {

	// ------------------
	// General properties

	i18n: Ember.inject.service(),
	notify: Ember.inject.service(),

	// ------------------
	// Actions

	/** @type {Object} */
	actions: {

		/**
		 * Mark notification as a read one
		 *
		 * @param notification
		 * @param refresh
		 */
		markAsRead(/** Notification **/ notification, /** delegate **/refresh)
		{
			let url = Config.APP.API_URL + '/v1/notifications/' + notification.get('id') + '/mark_as_read';

			this.get('notify').info(this.i18n.t('general.please.wait').string, {
				radius: true
			});

			this.tpAjax.makeRequest('PUT', url, {}, 'json').then(() =>
			{
				this.get('notify').success(this.i18n.t('notification.has.been.read').string, {
					radius: true
				});

				refresh ();

			}, function (error)
			{
				let message = (error.responseText && JSON.parse(error.responseText).message)
					? JSON.parse(error.responseText).message
					: this.i18n.t('general.error.occured').string;

				this.get('notify').error(message, {radius: true});

			});
		}
	},

});
