import DS from 'ember-data';
import { belongsTo, hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';

export default DS.Model.extend({

  // relations
  role: belongsTo('role'),

  name: attr("string"),
  description: attr("string"),
  address: attr("string"),
  startDate: attr("string"),
  endDate: attr("string"),
  published: attr("boolean"),
  finished: attr("boolean"),
  canceled: attr("boolean"),
  inProgress: attr("boolean"),
  castingCompanyId: attr("number"),
  setupStep: attr("number"),
  roles: attr(),

  currentStage: attr(),
  currentStageId: attr(),
  currentStageNumber: attr(),

  isPublishedOrCanceled: Ember.computed('setupStep', function (){
		return this.get('canceled') == true || this.get('published') == true ? true: false;
	}),

  isPublishedOrCanceledText: Ember.computed('setupStep', function (){
    if (this.get('canceled') == true ) {
      return 'This casting is canceled';
    }

    if (this.get('published') == true ) {
      return 'This casting is published';
    }
    return null;
	}),

  isReadyToPublish: Ember.computed('setupStep', 'published', function (){
		return this.get('setupStep') == 5  && this.get('published') == false ? true: false;
	}),

  isNotReadyToPublish: Ember.computed('setupStep', 'published', function (){
		return this.get('setupStep') < 5  && this.get('published') == false ? true: false;
	}),

  disableHearings: Ember.computed('setupStep', function (){
		return this.get('setupStep') == 2 ? true : false;
	}),

  disableQuestions: Ember.computed('setupStep', function (){
		return this.get('setupStep') == 2 ? true : false;
	}),

  start: Ember.computed('start_date', function (){
		return moment(this.get('start_date')).format('YYYY-MM-DD');
	}),
  end: Ember.computed('end_date', function (){
		return moment(this.get('end_date')).format('YYYY-MM-DD');
	}),
  status: Ember.computed('published', 'canceled', function (){

    if (this.get('canceled') == true) {
      return 'fa fa-remove fa-2 text-md';
    }

    if (this.get('published') == true) {
      return 'fa fa-check-circle-o fa-2 text-md';
    }

    return 'fa fa-circle-o fa-2 text-md';
	}),

  status_text: Ember.computed('published', 'canceled', function (){

    if (this.get('canceled') == true) {
      return 'canceled';
    }

    if (this.get('published') == true) {
      return 'published';
    }

    return 'not ready';
	}),

});
