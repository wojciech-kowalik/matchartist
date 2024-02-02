import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  notify: Ember.inject.service(),
  hearings: null,
  stage: null,
  casting: null,
  role: null,
  actions: {
    addHearing() {
      let role = this.get('role');
      let casting = this.get('casting');
      let record = this.get('store').createRecord('hearing', {});
      let hearings;
      if (Em.isEmpty(this.get('hearings'))) {
        hearings = Em.A();
      } else {
        hearings = this.get('hearings').toArray();
      }
      hearings.pushObject(record);
      this.set('hearings', hearings);
    },
    saveHearing(hearing) {
      let role = this.get('role');
      let stage = this.get('stage');
      let casting = this.get('casting');
      this.get('notify').info(this.i18n.t('general.please.wait').string, {
        radius: true
      });
      hearing.set('roleId', role.get('id'));
      hearing.set('stageId', stage.get('id'));
      hearing.set('castingId', casting.get('id'));
      hearing.save().then(()=>{
        this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
          radius: true
        });
      });
    },
    deleteHearing(hearing) {
      //question.set('roleId', role.get('id'));
      hearing.destroyRecord().then(()=>{
        let hearings = this.get('hearings').toArray();
        hearings.forEach(function(item, index, enumerable){
          if (item.get('id') == hearing.get('id')) {
            hearings.removeAt(index);
            this.set('hearings', hearings);
            return;
          }
        }.bind(this));
      });
    }
  }
});
