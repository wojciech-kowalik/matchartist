import Ember from 'ember';

export default Ember.Controller.extend({

	// ------------------
	// General properties

	/** @type {Object} */
	session: Ember.inject.service('session'),

	/** @type {Object} */
	notify: Ember.inject.service(),

	/** @type {Function} */
	init()
	{
		Ember.$.getScript('common.js');
	}

});
