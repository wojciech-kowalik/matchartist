import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('component/casting-canceled-cell', 'Integration | Component | component/casting canceled cell', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{component/casting-canceled-cell}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#component/casting-canceled-cell}}
      template block text
    {{/component/casting-canceled-cell}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
