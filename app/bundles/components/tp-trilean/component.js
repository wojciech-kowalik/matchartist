import Ember from 'ember';

export default Ember.Component.extend({

	classNames: ['form-group'],

	willRender() {
		let model = this.get('model');
		let yesChecked = (model.get('value') === "1" || model.get('value') === "true") ? "checked" : null;
		let noChecked = (model.get('value') === "0" || model.get('value') === "false") ? "checked" : null;
		let maybeChecked = model.get('value') === "maybe" ? "checked" : null;
		this.set('yesChecked', yesChecked);
		this.set('noChecked', noChecked);
		this.set('maybeChecked', maybeChecked);
	},
	didRender() {
		let model = this.get('model');
		this.$('input').on('change', (e)=> {
			this.sendAction('action', e.target.value, model);
		});
	}
});
