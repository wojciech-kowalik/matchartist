import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
		let model = this.get('model');
		this.$('input.text').on('change', (e)=> {
      let text = this.$('input.text');
      let val1 = !Ember.isEmpty(text[0]) ? text[0].value : null;
      let val2 = !Ember.isEmpty(text[1]) ? text[1].value : null;
			this.sendAction('action', [val1,val2], model);
		});
	}
});
