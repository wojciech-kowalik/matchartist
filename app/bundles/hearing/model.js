import DS from 'ember-data';
import { belongsTo, hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';
import moment from 'moment';

export default DS.Model.extend({

	// relations
	role: belongsTo ('role'),

	stageId: attr ('number'),
	roleId: attr ('number'),
	dateFrom: attr ('string'),
	dateTo: attr ('string'),
	address: attr ('string'),

	//computed
	label: Ember.computed('dateFrom', 'dateTo', function ()
	{
		return moment (this.get('dateFrom')).format('D.MM.YYYY') + ' - ' + moment (this.get('dateTo')).format('D.MM.YYYY');
	})

});
