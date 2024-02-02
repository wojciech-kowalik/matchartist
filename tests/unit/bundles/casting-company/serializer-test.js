import { moduleForModel, test } from 'ember-qunit';

moduleForModel('casting-company', 'Unit | Serializer | casting company', {
  // Specify the other units that are required for this test.
  needs: ['serializer:casting-company']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
