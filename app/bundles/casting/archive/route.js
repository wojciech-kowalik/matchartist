import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Config from '../../../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  session: Ember.inject.service(),
  notify: Ember.inject.service(),

  activate: function() {
		let role = this.get('session').get('data.authenticated').role;
    let castingCompanyId = localStorage.getItem('castingCompanyId');
    if ('casting_company' === role && !castingCompanyId) {
      this.transitionTo('profile');
      this.get('notify').error('Please fill casting company data !', {radius: true});
    }
		this._super.apply(this, arguments);
	},

  /** @type {Object} */
  actions: {
    edit(model) {
      this.transitionTo('casting.edit', model.get('id'), 0);
    },
  }

});
