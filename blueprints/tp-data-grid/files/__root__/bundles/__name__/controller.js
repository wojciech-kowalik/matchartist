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
		headerName: '<%= classifiedModuleName %>',

		/**
		 * Model
		 * @type {String}
		 */
		modelName: '<%= model %>',

		/**
		 * Grid height
		 * @type {Number}
		 */
		gridHeight: 50,

		/**
		 * Grid header
		 * @type {Boolean}
		 */
		gridHeader: true,

		/**
		 * Grid header name
		 * @type {Boolean}
		 */
		gridHeaderName: true,

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
				label: 'Actions',
				valuePath: 'self',
				width: '80px',
				sortable: false,
				// you can specify your own component
				cellComponent: 'default-grid-actions'
			}]
	}

});
