import Ember from 'ember';
import ActorAttributeFnderMixin from 'frontend/mixins/actor-attribute-fnder';
import { module, test } from 'qunit';

module('Unit | Mixin | actor attribute fnder');

// Replace this with your real tests.
test('it works', function(assert) {
  let ActorAttributeFnderObject = Ember.Object.extend(ActorAttributeFnderMixin);
  let subject = ActorAttributeFnderObject.create();
  assert.ok(subject);
});
