import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {

	notify: Ember.inject.service(),
	queryParams: {
		transitionTarget: {},
		transitionId: {}
	},

	model(params)
	{
		let model = this.store.createRecord('message');
		this.set('transitionTarget', params.transitionTarget);
		this.set('transitionId', params.transitionId);

		if (params.user_id !== 0) {
			model.set('receiverUserId', params.user_id);
		}
		return model;
	},

	actions:
	{
		send()
		{
			this.get('notify').info(this.i18n.t('general.please.wait').string, {radius: true});
			let model = this.get('controller.model');
			model.save().then(()=>
			{
				this.get('notify').success('Message sent', {radius: true});
				let transitionId = this.get("transitionId");
				if (transitionId > 0) {
					this.transitionTo(this.get("transitionTarget"), transitionId);
				} else {
					this.transitionTo(this.get("transitionTarget"));
				}
			}).catch((error) =>
			{
				this.get('notify').error(this.i18n.t('register.form.error').string, {radius: true});
			});
		}
	}
});
