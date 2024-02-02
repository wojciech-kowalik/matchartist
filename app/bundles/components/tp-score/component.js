import Ember from 'ember';

export default Ember.Component.extend({

	classNames: ['form-group'],

	willRender() {
		let model = this.get('model');
		let oneChecked = model.get('value') === "1" ? "checked" : null;
    let twoChecked = model.get('value') === "2" ? "checked" : null;
    let threeChecked = model.get('value') === "3" ? "checked" : null;
    let fourChecked = model.get('value') === "4" ? "checked" : null;
    let fiveChecked = model.get('value') === "5" ? "checked" : null;

		this.set('oneChecked', oneChecked);
    this.set('twoChecked', twoChecked);
    this.set('threeChecked', threeChecked);
    this.set('fourChecked', fourChecked);
    this.set('fiveChecked', fiveChecked);
	},
	didRender() {
		let model = this.get('model');
		this.$('input').on('change', (e)=> {
			this.sendAction('action', e.target.value, model);
		});
	}
});
