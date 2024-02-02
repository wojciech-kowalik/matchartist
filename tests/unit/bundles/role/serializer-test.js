import { moduleForModel, test } from 'ember-qunit';

moduleForModel('role', 'Unit | Serializer | role', {
  // Specify the other units that are required for this test.
  needs: ['serializer:role']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
