import DS from 'ember-data';
import { belongsTo, hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';

export default DS.Model.extend({

  // relations
  casting: belongsTo('casting'),
  hearings: hasMany('hearing'),

  name: attr("string"),
  description: attr("string"),
  participating: attr("boolean"),
  questions: attr(),
  stages: attr(),
  didActorsMatching: attr("boolean"),
  matchedActors: attr(),
  castingId: attr('number'),
  attributesFilter:  attr("string"),
  actorStatus: attr(),

  // computed
  status: Ember.computed('actorStatus', function () {

    let colorClass = 'red-color';
    let statusName = 'None';

    switch(this.get('actorStatus')){

      case 'role_won':           colorClass = 'green-color';  break;
      case 'role_qualified':     colorClass = 'green-color';  break;
      case 'hearing_rejected':   colorClass = 'red-color';    break;
      case 'hearing_registered': colorClass = 'green-color';  break;
      case 'hearing_accepted':   colorClass = 'green-color';  break;

    }

    let splitted = this.get('actorStatus').split('_');

    if(splitted[0]){
      let first = splitted[0].substr(0, 1).toUpperCase() + splitted[0].substr(1);
      statusName = first + ' ' + splitted[1];

    }

    return {name: statusName, colorClass: colorClass};
  })


});
