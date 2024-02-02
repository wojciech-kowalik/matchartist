import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
		let url = window.location.href;
		let splited =  url.split("/");
		this.set('casting_id', splited[splited.length-1]);
	}
});
