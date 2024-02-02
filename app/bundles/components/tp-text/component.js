import Ember from 'ember';

export default Ember.Component.extend({

	didRender() {
		let model = this.get('model');
		this.$('input.text').on('change', (e)=> {
			this.sendAction('action', e.target.value, model);
		});
	}
});
