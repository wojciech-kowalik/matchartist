import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  topic: attr('string'),
  body: attr('string'),
  createdAt: attr('string'),
  read: attr('boolean'),
  senderUser: attr(),
  reciverUser: attr(),
  user: attr(),
  senderUserId: attr('number'),
  receiverUserId: attr('number'),
  senderFullName: Ember.computed('senderUser', function (){
		return this.get('senderUser.firstname') + ' ' + this.get('senderUser.lastname');
	}),
  hasReceiverUserId: Ember.computed('receiverUserId', function() {
    return !Ember.isEmpty(this.get('receiverUserId')) ? true : false;
  })

});
