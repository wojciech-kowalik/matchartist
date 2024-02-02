import DS from 'ember-data';
import { belongsTo, hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';
import moment from 'moment';

export default DS.Model.extend({

	// relations
	role: belongsTo('role'),

	read: attr(),
	icon: 'bullhorn'

});
