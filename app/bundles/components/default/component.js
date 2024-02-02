import Ember from 'ember';
import Table from 'ember-light-table';

const { isEmpty } = Ember;

/**
 * Data grid component
 *
 * @author wkowalik
 * @version 1.0
 */
export default Ember.Component.extend({

	// ------------------
	// General properties

	/** @type {Object} */
	tpEvent: Ember.inject.service(),

	/** @type {Object} */
	store: Ember.inject.service(),

	/** @type {String[]} */
	classNames: ['tp-data-grid'],

	/** @type {String[]} */
	classNameBindings: ['withoutHeader', 'asList'],

	/** @type {Table} */
	table: null,

	/** @type {String} */
	model: null,

	/** @type {Number} */
	height: null,

	// ------------------
	// Query properties

	/** @type {Number} */
	offset: 0,

	/** @type {Number} */
	limit: 10,

	/** @type {String} */
	sort: null,

	/** @type {String} */
	dir: null,

	/** @type {String} */
	adapter: null,

	/** @type {Mixed[]} */
	parameters: {},

	// ------------------
	// Additional properties

	/** @type {Boolean} */
	isLoading: false,

	/** @type {Boolean} */
	isPagerShowed: true,

	/** @type {Number} */
	totalPages: 0,

	/** @type {String[]} */
	queryProperties: ['offset', 'limit', 'sort', 'dir', 'adapter', 'parameters'],

	/** @type {String[]} */
	queryAdditionals: [],

	/** @type {Boolean} */
	withoutHeader: false,

	/** @type {Boolean} */
	asList: false,

	init()
	{
		this._super(...arguments);
		this.get('tpEvent').on('tpDataGridFilter', (data) =>
		{
			this.onFilter(data);
		});
	},

	// ------------------
	// Events

	/**
	 * Event handler
	 *
	 * @function
	 * @return {undefined}
	 */
	didReceiveAttrs()
	{
		this.set('table', new Table (this.get('configuration.columns')));
		this.set('model', this.get('configuration.modelName'));
		this.set('height', this.get('configuration.gridHeight') + 'vh');
		this.set('asList', this.get('configuration.gridAsList'));

		if (!isEmpty (this.get('configuration.gridHeader'))) {
			this.set('withoutHeader', !this.get('configuration.gridHeader'));
		}

		if (!isEmpty (this.get('configuration.additionals'))) {
			this.setProperties(this.get('configuration.additionals'));
		}

		this.fetchRecords();
	},

	/**
	 * Event handler
	 *
	 * @function
	 * @return {undefined}
	 */
	onFilter(data)
	{
		if (this.isDestroyed) {
			return;
		}
		this.get('table').setRows([]);
		this.setProperties({
			parameters: data
		});
		this.fetchRecords();
	},

	// ------------------
	// Actions

	/** @type {Object} */
	actions: {

		/**
		 * Refresh grid
		 *
		 * @function
		 */
		refresh()
		{
			this.get('table').setRows([]);
			this.fetchRecords();
		},

		/**
		 * Change current offset
		 *
		 * @function
		 * @param {Object} page - Selected offset
		 */
		changePage(page)
		{
			this.setProperties({
				offset: (page - 1) * this.get('limit')
			});

			this.get('table').setRows([]);
			this.fetchRecords();

		},

		/**
		 * Get data after click on header
		 *
		 * @function
		 * @param {Object} column - Current column
		 */
		onSortColumn(column)
		{
			if (column.sorted) {

				this.setProperties({
					dir: column.ascending ? 'asc' : 'desc',
					sort: Ember.String.underscore(column.get('valuePath')),
					offset: 1
				});

				this.get('table').setRows([]);
				this.fetchRecords();

			}
		}
	},

	// ------------------
	// Methods

	/**
	 * Fetch records from store
	 *
	 * @function
	 * @return {undefined}
	 */
	fetchRecords()
	{
		this.set('isLoading', true);
		let filterProperties = [];

		this.get('queryProperties').forEach((item, index, object) =>
		{
			if (!isEmpty (this.get(item))) {
				filterProperties.push(item);
			}
		});

		this.get('store').query(this.get('model'), this.getProperties(filterProperties)).then(records =>
		{
			this.get('table').addRows(records);
			this.set('totalPages', Math.ceil(records.get('meta.total_count') / this.get('limit')));

			if(+this.get('totalPages') === 1){
				this.set('isPagerShowed', false);
			}

			this.set('isLoading', false);
		});
	}

});
