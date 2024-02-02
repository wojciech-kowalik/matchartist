import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tp-trilean', 'Integration | Component | tp trilean', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tp-trilean}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tp-trilean}}
      template block text
    {{/tp-trilean}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
