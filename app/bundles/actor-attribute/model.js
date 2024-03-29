import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  has_value: attr("boolean"),
  value: attr("string"),
  details: attr("string"),
  attribute : attr()
});
