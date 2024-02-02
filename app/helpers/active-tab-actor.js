import Ember from 'ember';

export default Ember.Helper.extend({
  compute(params, hash) {
    let tab = params[0];
    let published = params[1].get('published');
    let castingStep = params[1].get('setupStep');
    let cookie = Em.$.cookie('tab_actor');
    if (published) {
      if (!Em.isEmpty(cookie) && cookie == tab) {
        return 'active';
      } else if (Em.isEmpty(cookie) && tab == 'tabMatchedActors') {
        return 'active';
      }
    } else {
      switch (castingStep) {
        case 1:
          if (tab == 'tabCasting') {
            return 'active';
          }
          break;
        case 2:
          if (tab == 'tabRole') {
            return 'active';
          } else if (tab == 'tabQuestions') {
            return 'disabled';
          } else if (tab == 'tabHearings') {
            return 'disabled';
          }
          break;
        case 3:
          if (tab == 'tabQuestions') {
            return 'active';
          } else if (tab == 'tabHearings') {
            return 'disabled';
          }
          break;
        case 4:
          if (tab == 'tabHearings') {
            return 'active';
          }
          break;
        case 5:
          if (tab == 'tabHearings') {
            return 'active';
          }
          break;
      }
    }
  }
});


/*
if (published) {
  if (!Em.isEmpty(this.cookie.getCookie('tab')) && this.cookie.getCookie('tab') != 'false') {
    this.controllerFor('casting/edit').set(this.cookie.getCookie('tab'), 'active');
  } else {
    this.controllerFor('casting/edit').set('tabMatchedActors', 'active');
  }
} else {
  if (castingStep == 1) {
    this.controllerFor('casting/edit').set('infoMessage', null);
    this.controllerFor('casting/edit').set('tabCasting', 'active');
    this.controllerFor('casting/edit').set('tabRole', null);
    this.controllerFor('casting/edit').set('tabQuestions', null);
    this.controllerFor('casting/edit').set('tabHearings', null);
  } else if (castingStep == 2) {
    this.controllerFor('casting/edit').set('infoMessage', this.i18n.t('casting.add.step2'));
    this.controllerFor('casting/edit').set('tabRole', 'active');
    this.controllerFor('casting/edit').set('tabCasting', null);
    this.controllerFor('casting/edit').set('tabQuestions', 'disabled');
    this.controllerFor('casting/edit').set('tabHearings', 'disabled');
  } else if (castingStep == 3) {

    this.controllerFor('casting/edit').set('infoMessage', this.i18n.t('casting.add.step3'));
    this.controllerFor('casting/edit').set('tabRole', null);
    this.controllerFor('casting/edit').set('tabCasting', null);
    this.controllerFor('casting/edit').set('tabQuestions', 'active');
    this.controllerFor('casting/edit').set('tabHearings', null);
  } else if (castingStep == 4) {
    this.controllerFor('casting/edit').set('infoMessage', this.i18n.t('casting.add.step4'));
    this.controllerFor('casting/edit').set('tabRole', null);
    this.controllerFor('casting/edit').set('tabCasting', null);
    this.controllerFor('casting/edit').set('tabQuestions', null);
    this.controllerFor('casting/edit').set('tabHearings', 'active');
  } else if (castingStep == 5) {
    if (!published) {
      this.controllerFor('casting/edit').set('infoMessage', this.i18n.t('casting.add.step5'));
    } else {
      this.controllerFor('casting/edit').set('infoMessage', null);
    }
    this.controllerFor('casting/edit').set('tabRole', null);
    this.controllerFor('casting/edit').set('tabCasting', null);
    this.controllerFor('casting/edit').set('tabQuestions', null);
    this.controllerFor('casting/edit').set('tabHearings', 'active');
  }
}
*/
