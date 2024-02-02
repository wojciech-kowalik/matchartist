import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    castingId: attr("number"),
    stageNumber: attr("number"),
    published: attr('boolean')
});
