import ApplicationAdapter from '../application/adapter';

export default ApplicationAdapter.extend({

	query(store, type, query)
	{
		let newQuery = Em.Object.create({
			limit: query.limit,
			offset: query.offset,
			filter_by: !Em.isEmpty(query.parameters) ? query.parameters.filter_by : null
		});
		return this._super(store, type, newQuery);
	}
});
