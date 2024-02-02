import Ember from 'ember';

export default Ember.Component.extend({

	classNames: ['form-group'],

	willRender() {

		let model = this.get('model');
		let yesChecked = (model.get('value') === "true" || this.get('value') === true) ? "checked" : null;
		let noChecked = (model.get('value') === "false" || this.get('value') === false) ? "checked" : null;
		this.set('yesChecked', yesChecked);
		this.set('noChecked', noChecked);
	},
	didRender() {
		let model = this.get('model');
		this.$('input').on('change', (e)=> {
			this.sendAction('action', e.target.value, model);
		});
	}
});
