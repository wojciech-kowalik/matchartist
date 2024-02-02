import Ember from 'ember';
import TpDataAdapterMixin from 'frontend/mixins/tp-data-adapter';
import { module, test } from 'qunit';

module('Unit | Mixin | tp data adapter');

// Replace this with your real tests.
test('it works', function(assert) {
  let TpDataAdapterObject = Ember.Object.extend(TpDataAdapterMixin);
  let subject = TpDataAdapterObject.create();
  assert.ok(subject);
});
