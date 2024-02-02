import Ember from 'ember';

/**
 * @class ResetScollMixin
 * @module mixins/reset-scroll-mixin
 * @extends Ember.Mixin
 * @public
 */
export default Ember.Mixin.create({

	/**
	 * Scroll to the top after changing route
	 *
	 * @method activate
	 * @public
	 */
	activate: function ()
	{
		this._super();
		window.scrollTo(0, 0);
	}

});
