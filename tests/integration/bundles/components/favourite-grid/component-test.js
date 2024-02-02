import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('favourite-grid', 'Integration | Component | favourite grid', {
  integration: true
});

test('it renders', function(assert) {
  // Set any queryProperties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{favourite-grid}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#favourite-grid}}
      template block text
    {{/favourite-grid}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
