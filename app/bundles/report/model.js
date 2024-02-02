import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Config from '../../config/environment';

export default Model.extend({

	// relations
	attribute: belongsTo('attribute'),

	match: attr('boolean'),
	value: attr()

});
