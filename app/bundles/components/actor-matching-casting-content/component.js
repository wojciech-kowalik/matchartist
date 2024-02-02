import Ember from 'ember';
import Config from '../../../config/environment';

export default Ember.Component.extend({

	willRender()
	{
		let url     = window.location.href;
		let splited = url.split("/");
		this.set('casting_id', splited[splited.length - 1]);
	}

});
