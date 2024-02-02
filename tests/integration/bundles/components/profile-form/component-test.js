import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('profile-form', 'Integration | Component | profile form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any queryProperties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{profile-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#profile-form}}
      template block text
    {{/profile-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
