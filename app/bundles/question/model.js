import Ember from 'ember';
import DS from 'ember-data';
import { belongsTo, hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';

export default DS.Model.extend({

    // relations
    actor: hasMany('actor'),
    answer: belongsTo('answer'),

    text: attr("string"),
    answerId: attr("number"),
    roleId: attr("number"),

    isAnswer: Ember.computed('answer', function (){
        return (this.get('answer.id') !== undefined) ? true : false;
    }),

});
