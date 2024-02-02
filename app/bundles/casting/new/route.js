import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  notify: Ember.inject.service(),
  model() {
      return this.store.createRecord('casting');
  },
  activate() {
    this.controllerFor('casting/new').set('infoMessage', this.i18n.t('casting.add.step1'));
  },
  actions: {
    saveCasting() {
      this.get('notify').info(this.i18n.t('general.please.wait').string, {radius: true});
      let model = this.get('controller.model');
      let isNew = model.get('isNew');
      model.set('setupStep',2);
      model.save().then((response)=> {
        if (isNew === true) {
          let stage = this.store.createRecord('stage');
          stage.set('castingId',response.get('id'));
          stage.save().then((data) => {
            this.get('notify').success(this.i18n.t('general.item.saved').string, {radius: true});
            this.transitionTo('casting.edit', response.get('id'));
          });
        }
      }).catch((error) => {
        this.get('notify').error(this.i18n.t('register.form.error').string, {radius: true});
      });
    }
  }
});
