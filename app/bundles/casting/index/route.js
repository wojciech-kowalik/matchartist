import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Config from '../../../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  session: Ember.inject.service(),
  notify: Ember.inject.service(),

  activate() {
    let role = this.get('session').get('data.authenticated').role;
    let castingCompanyId = localStorage.getItem('castingCompanyId', castingCompanyId);
    if ('casting_company' === role && !castingCompanyId) {
      this.transitionTo('profile');
      this.get('notify').error('Please fill casting company data !', {radius: true});
    }
  },
  /** @type {Object} */
  actions: {
    new() {
      this.transitionTo('casting.new');
    },
    edit(model) {
      this.transitionTo('casting.edit', model.get('id'));
    },
    actors(model) {
      this.transitionTo('casting.actors', model.get('id'));
    },
    cancel(model){
			let url = Config.APP.API_URL + '/v1/castings/' + model.get('id') + '/cancel';
      this.get('notify').info(this.i18n.t('general.please.wait').string, {
        radius: true
      });
      this.tpAjax.makeRequest('POST', url, {}, 'json').then(function() {
        this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
          radius: true
        });
        model.action();
      }.bind(this), function(error) {
        this.get('notify').error(this.i18n.t('actor-attribute.form.error').string, {
          radius: true
        });
      }.bind(this));
    },
    publish(model){
      this.get('notify').info(this.i18n.t('general.please.wait').string, {
        radius: true
      });
      let stages = this.get('store').query('stage', {
        'castingId': model.get('id')
      }).then(function(stage){
        let currentStage = stage.get('lastObject');
        let castingUrl = Config.APP.API_URL + '/v1/castings/' + model.get('id') + '/publish';
        let stageUrl = Config.APP.API_URL + '/v1/castings/' + model.get('id') + '/stages/' + currentStage.get('id') + '/publish';
        this.tpAjax.makeRequest('POST', castingUrl, {}, 'json').then(function() {
          this.tpAjax.makeRequest('POST', stageUrl, {}, 'json').then(function() {
            this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
              radius: true
            });
            model.action();
          }.bind(this), function(error) {
            this.get('notify').error(this.i18n.t('actor-attribute.form.error').string, {
              radius: true
            });
          }.bind(this));
        }.bind(this), function(error) {
          this.get('notify').error(this.i18n.t('actor-attribute.form.error').string, {
            radius: true
          });
        }.bind(this));
      }.bind(this));

    },
    delete(model) {
      model.destroyRecord().then(() => {
        model.action();
      });
    }
  }

});
