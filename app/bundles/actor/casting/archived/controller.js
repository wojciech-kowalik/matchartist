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
		headerName: 'role.actor.casting.archived',

		/**
		 * Model
		 * @type {String}
		 */
		modelName: 'role',

		/**
		 * Grid height
		 * @type {Number}
		 */
		gridHeight: 50,

		/**
		 * Grid header
		 * @type {Boolean}
		 */
		gridHeader: false,

		/**
		 * Grid act as a list
		 * @type {Boolean}
		 */
		gridAsList: false,

		/**
		 * Additional object data
		 * @type {Object}
		 */
		additionals: {
			limit: 10,
			adapter: '',
			parameters: {url: 'me', filter_by: 'archive'}
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
				cellComponent: 'icon-avatar'
			},

			{
				label: 'Content',
				valuePath: 'self',
				width: '250px',
				cellComponent: 'archived-content'
			}]
	}

});
