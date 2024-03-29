import { moduleForModel, test } from 'ember-qunit';

moduleForModel('actor', 'Unit | Serializer | actor', {
  // Specify the other units that are required for this test.
  needs: ['serializer:actor']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
