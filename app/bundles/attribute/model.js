import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
    builtIn:attr('boolean'),
    public:attr('boolean'),
    attrType:attr('string'),
    rangeFrom:attr('number'),
    rangeTo:attr('number'),
    name:attr('string'),
    nameId:attr('number'),
    description:attr('string'),
    descriptionId:attr('number'),
    comboOptions:attr(),
    value: attr("string"),
    valueFrom: attr("string"),
    valueTo: attr("string"),
    comboContext: Ember.computed.map('comboOptions', function(option, index) {
      if (option.description.length < 2) {
        return { value: option.id, label: option.name};
      } else{
        return { value: option.id, label: option.name, description: option.description};
      }

    }),
    fullDescription: Ember.computed('description', function() {
        return this.get('name') + '  ' + this.get('description');
    }),
    isBoolean: Ember.computed('attribute', function() {
        return this.get('attrType') === "boolean";
    }),
    isTrilean: Ember.computed('attribute', function() {
        return this.get('attrType') === "trilean";
    }),
    isNumerical: Ember.computed('attribute', function() {
        return this.get('attrType') === "numerical";
    }),
    isRangeInt: Ember.computed('attribute', function() {
        return this.get('attrType') === "range_int";
    }),
    isRangeFloat: Ember.computed('attribute', function() {
        return this.get('attrType') === "range_float";
    }),
    isComboSingle: Ember.computed('attribute', function() {
        return this.get('attrType') === "combo_single";
    }),
    isComboMulti: Ember.computed('attribute', function() {
        return this.get('attrType') === "combo_multi";
    }),
    isFreeText: Ember.computed('attribute', function() {
        return this.get('attrType') === "free_text";
    }),
    isScore: Ember.computed('attribute', function() {
        return this.get('attrType') === "score";
    })
});
