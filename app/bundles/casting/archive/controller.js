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
		modelName: 'casting',

		/**
		 * Grid height
		 * @type {Number}
		 */
		gridHeight: 50,

		/**
		 * Additional object data
		 * @type {Object}
		 */
		additionals: {
			limit: 10,
			adapter: ''
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
				label: 'Name',
				valuePath: 'name',
				width: '100px',
				sortable: true
			},
			{
				label: 'Published',
				valuePath: 'published',
				width: '100px',
				sortable: false,
				cellComponent: 'casting-published-cell'
			},
			{
				label: 'Canceled',
				valuePath: 'canceled',
				width: '100px',
				sortable: false,
				cellComponent: 'casting-canceled-cell'
			}]
	}

});
