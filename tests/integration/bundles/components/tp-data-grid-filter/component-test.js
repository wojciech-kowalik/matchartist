import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tp-data-grid-filter', 'Integration | Component | tp data grid filter', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tp-data-grid-filter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tp-data-grid-filter}}
      template block text
    {{/tp-data-grid-filter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
