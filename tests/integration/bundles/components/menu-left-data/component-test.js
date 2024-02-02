import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('menu-left-data', 'Integration | Component | menu left data', {
  integration: true
});

test('it renders', function(assert) {
  // Set any queryProperties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{menu-left-data}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#menu-left-data}}
      template block text
    {{/menu-left-data}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
