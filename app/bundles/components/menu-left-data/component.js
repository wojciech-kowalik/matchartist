import Ember from 'ember';
import Config from '../../../config/environment';

/**
 * Media general component
 *
 * @author wkowalik
 * @version 1.0
 */
export default Ember.Component.extend({

	// ------------------
	// General properties

	/** @type {String[]} */
	classNames: ['menu-left-data'],

	/** @type {Object} */
	session: Ember.inject.service(),

	/** @type {Object} */
	store: Ember.inject.service(),

	// ------------------
	// Additional properties

	/** @type {String} */
	roleName: Ember.computed('session', function() {

		let role = this.get('session').get('data.authenticated').role;
		if (!Ember.isEmpty(role)) {
			role = role.replace('_', ' ');
			return `${role}`;
		} else {
			return null;
		}
	}),

	/** @type {Object} */
	avatar: null,

	init(){

		this.get('store').queryRecord('avatar', {}
		).then((avatar) => {
			this.set('avatar', avatar);
		}).catch(function (response){});

		this._super(...arguments);

	}

});
