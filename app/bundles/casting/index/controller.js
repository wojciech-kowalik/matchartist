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
		headerName: 'catsting.castings',

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

		gridHeaderName: false,

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
				label: 'Date start',
				valuePath: 'start',
				width: '50px',
				sortable: true
			},
			{
				label: 'Date finish',
				valuePath: 'end',
				width: '100px',
				sortable: true
			},
			{
				label: 'Status',
				valuePath: 'status',
				width: '40px',
				sortable: false,
				cellComponent: 'casting-status-cell'
			},
			{
				label: 'Actions',
				valuePath: 'self',
				width: '150px',
				sortable: false,
				cellComponent: 'casting-grid-actions'
			}]
	}

});
