import Ember from 'ember';

export default Ember.Controller.extend({

	/**
	 * Grid configuration object
	 * @type {Object}
	 * */
	gridConfiguration: {

		/**
		 * Grid header name
		 * @type {String}
		 */
		headerName: 'agent.actor.role',

		/**
		 * Model
		 * @type {String}
		 */
		modelName: 'actor-role',

		/**
		 * Grid height
		 * @type {Number}
		 */
		gridHeight: 55,

		/**
		 * Grid header
		 * @type {Boolean}
		 */
		gridHeader: false,

		/**
		 * Grid header name
		 * @type {Boolean}
		 */
		gridHeaderName: true,

		/**
		 * Grid act as a list
		 * @type {Boolean}
		 */
		gridAsList: true,

		/**
		 * Additional object data
		 * @type {Object}
		 */
		additionals: {
			limit: 10,
			adapter: '',
			parameters: {}
		},

		/**
		 * Grid columns
		 * @type {Object[]}
		 * @example column
		 *
		 * {
		 *	 label: 'Name', // label for column
		 *	 valuePath: 'firstname', // model attribute name
		 *	 width: '60px', // width of column
		 *	 sortable: true // set if column has sortable values
		 * }
		 *
		 */
		columns: [
			{
				label: 'Avatar',
				valuePath: 'self',
				width: '80px',
				cellComponent: 'user-avatar'
			},
			{
				label: 'Content',
				valuePath: 'self',
				width: '250px',
				cellComponent: 'agent-actor-role-content'
			}]
	}

});
