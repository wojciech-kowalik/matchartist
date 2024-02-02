import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('component/casting-published-cell', 'Integration | Component | component/casting published cell', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{component/casting-published-cell}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#component/casting-published-cell}}
      template block text
    {{/component/casting-published-cell}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
