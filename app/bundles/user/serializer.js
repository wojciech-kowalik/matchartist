import RESTSerializer from 'ember-data/serializers/rest';
import DS from 'ember-data';
import Ember from 'ember';

export default RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

	attrs: {
		actor: {embedded: 'always'},
		castingCompanies: {embedded: 'always'}
	},

	keyForAttribute: function (attr)
	{
		return Ember.String.underscore(attr);
	},

	serializeIntoHash: function (hash, type, record, options)
	{
		Ember.merge(hash, this.serialize(record, options));
	},

	normalizeResponse(store, primaryModelClass, payload, id, requestType) {

		let message = "";
		let user    = {};
		let users   = [];

		if (payload.message) {
			message = payload.message;
		}

		if (Ember.isArray(payload.data)) {

			users         = payload.data;
			users.message = message;
			payload       = {users};

		} else {

			if (payload.data) {
				payload = payload.data;
			}

			user = payload;

			if (payload.casting_companies) {

				user.casting_companies = payload.casting_companies;

				user.casting_companies.forEach((item, key) =>
				{
					user.casting_companies[key] = {
						id: item.casting_company.id,
						name: item.casting_company.name,
						description: item.casting_company.description,
						avatar: item.casting_company.avatar,
						address: item.casting_company.address,
						city: item.casting_company.city,
						zip_number: item.casting_company.zip_number,
						country: item.casting_company.country,
						id_number: item.casting_company.id_number,
						contact_firstname: item.casting_company.contact_firstname,
						contact_lastname: item.casting_company.contact_lastname,
						contact_email: item.casting_company.contact_email,
						contact_phone: item.casting_company.contact_phone,
						website: item.casting_company.website,
						tax_number: item.casting_company.tax_number
					};
				});
			}

			user.message = message;
			payload      = {user};

		}

		return this._super(store, primaryModelClass, payload, id, requestType);
	}

});
