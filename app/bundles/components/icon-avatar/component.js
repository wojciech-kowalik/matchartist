import Ember from 'ember';

export default Ember.Component.extend({

	// ------------------
	// Additional properties

	/** @type {String[]} */
	classNames: ['icon-avatar'],

	/** @type Object */
	icons: [
		{route: 'actor.casting.archived', icon: 'history'},
		{route: 'actor.casting.won', icon: 'thumbs-o-up'},
		{route: 'actor.casting.accepted', icon: 'paper-plane-o'},
		{route: 'actor.casting.matched', icon: 'check-circle-o'},
		{route: 'actor.casting.upcoming', icon: 'television'}
	],

	/** @type String */
	selectedIcon: null,

	// ------------------
	// Events

	/**
	 * Event handler
	 *
	 * @method didInsertElement
	 * @return {undefined}
	 */
	willRender(){

		let path = Ember.getOwner(this).lookup('controller:application').currentPath;

		this.get('icons').forEach((item) => {

			if(item.route === path){
				this.set('selectedIcon', item.icon);
			}
		});

	}

});
