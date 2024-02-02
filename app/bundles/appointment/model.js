import DS from 'ember-data';
import { belongsTo, hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  actor: attr(),
  user: Ember.computed('actor.user', function (){
		return this.get('actor.user');
	}),
  hearing: attr(),
  hearingId: attr('number')
});
