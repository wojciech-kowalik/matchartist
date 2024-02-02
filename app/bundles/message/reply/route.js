import Ember from 'ember';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {

	notify: Ember.inject.service(),

	model(params) {
		return Em.RSVP.hash({
			reply: this.store.createRecord('message'),
			message: this.get('store').findRecord('message', params.id)
		});
	},

	actions: {
		send() {
			this.get('notify').info(this.i18n.t('general.please.wait').string, {radius: true});
			let promise = this.get('controller.model');
			let message = promise.message;
			let reply   = promise.reply;
			reply.set('receiverUserId', message.get('senderUserId'));
			reply.save().then(()=>
			{
				this.get('notify').success('Message sent', {radius: true});
				this.transitionTo('message.index');
			}).catch((error) =>
			{
				this.get('notify').error(this.i18n.t('register.form.error').string, {radius: true});
			});
		}
	}
});
