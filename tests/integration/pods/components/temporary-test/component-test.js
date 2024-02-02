import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('temporary-test', 'Integration | Component | temporary test', {
  integration: true
});

test('it renders', function(assert) {
  // Set any queryProperties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{temporary-test}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#temporary-test}}
      template block text
    {{/temporary-test}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
