import Ember from 'ember';

export default Ember.Component.extend({

	// ------------------
	// Events

	/**
	 * Event handler
	 *
	 * @method didInsertElement
	 * @return {undefined}
	 */
	didInsertElement()
	{
		this.$('.modal').modal().on('hidden.bs.modal', function() {
			this.sendAction('closeMethod');
		}.bind(this));

	},

	// ------------------
	// Actions

	/** @type {Object} */
	actions: {

		activityMethod()
		{
			this.$('.modal').modal('hide');
			this.sendAction('activityMethod');
		}
	}
});
