import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  notify: Ember.inject.service(),
  questions: null,
  role: null,
  canConfirm: false,
  actions: {
    addQuestion() {
      let role = this.get('role');
      let record = this.get('store').createRecord('question', { roleId: role.get('id')});
      let questions;
      if (Em.isEmpty(this.get('questions'))) {
        questions = Em.A();
      } else {
        questions = this.get('questions').toArray();
      }
      questions.pushObject(record);
      this.set('questions', questions);
    },
    saveQuestion(question, role) {
      this.get('notify').info(this.i18n.t('general.please.wait').string, {
        radius: true
      });
      question.set('roleId', role.get('id'));
      question.save().then(()=>{
        this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
          radius: true
        });
      });
    },
    deleteQuestion(question, role) {
      question.set('roleId', role.get('id'));
      question.destroyRecord().then(()=>{
        let questions = this.get('questions').toArray();
        questions.forEach(function(item, index, enumerable){
          if (item.get('id') == question.get('id')) {
            questions.removeAt(index);
            this.set('questions', questions);
            return;
          }
        }.bind(this));
      });
    }
  }
});
