import Ember from 'ember';

export default Ember.Component.extend({

	tpEvent: Ember.inject.service(),

	tpActorAttributeFilter: Ember.inject.service(),

	store: Ember.inject.service(),
	isShowed: false,

	didInsertElement()
	{
		let tpActorAttributeFilter = this.get('tpActorAttributeFilter');
		let attributes_filter      = tpActorAttributeFilter.get('filter');
		this.set('attributes_filter', attributes_filter);
		this.fetchAttributes();

	},

	fetchAttributes()
	{
		let tpActorAttributeFilter = this.get('tpActorAttributeFilter').get('filter');
		Ember.run(function ()
		{
			this.get('store').unloadAll('attribute');
		}.bind(this));
		this.get('store').unloadAll('attribute');
		this.get('store').findAll('attribute').then((attributes) =>
		{

			this.get('store').createRecord('attribute', {
				name: 'age',
				builtIn: true,
				description: '',
				value: null,
				value_from: null,
				value_to: null,
				important: true,
				attrType: 'range_int'
			});
			this.get('store').createRecord('attribute', {
				name: 'gender',
				description: '',
				builtIn: true,
				value: null,
				value_from: null,
				value_to: null,
				important: true,
				attrType: 'combo_single',
				comboOptions: [
					{id: 'f', name: 'Female', description: 'Female'},
					{id: 'm', name: 'Male', description: 'Male'}
				]
			});

			tpActorAttributeFilter.forEach((filter) =>
			{
				let attr = this.get('store').peekRecord('attribute', filter.attribute_type_id);
				if (!Ember.isEmpty(attr)) {
					if (!Ember.isEmpty(filter.value)) {
						attr.set('value', filter.value);
					}
					if (!Ember.isEmpty(filter.value_from)) {
						attr.set('valueFrom', filter.value_from);
					}
					if (!Ember.isEmpty(filter.value_to)) {
						attr.set('valueTo', filter.value_to);
					}
				}
			});
			this.set('attributes', attributes);
		});
	},

	formatResult(v, attribute) {
		let result = {};
		if (attribute.get('builtIn') == true) {
			result = {
				attribute_type_id: parseInt(attribute.get('id')),
				name: attribute.get('name'),
				value: null,
				value_from: null,
				value_to: null,
				important: true
			};
		} else {
			result = {
				attribute_type_id: parseInt(attribute.get('id')),
				value: null,
				value_from: null,
				value_to: null,
				important: true
			};
		}

		if (attribute.get('isComboMulti')) {
			result.value = v.join();
		} else if (attribute.get('isComboSingle')) {
			result.value =  $.isNumeric(v) ? parseInt(v) : v;
		} else if (attribute.get('isBoolean')) {
			result.value = v == 1 ? true : false;
		} else if (attribute.get('isRangeInt')) {
			result.value_from = parseInt(v[0]);
			result.value_to = parseInt(v[1]);
		} else if (attribute.get('isRangeFloat')) {
			result.value_from = parseFloat(v[0]);
			result.value_to = parseFloat(v[1]);
		} else if (attribute.get('isScore')) {
			result.value = parseInt(v);
		} else {
			result.value = v;
		}
		return result;
	},

	actions: {

		filter()
		{
			this.get('tpEvent').trigger('tpDataGridFilter', {
				attributes_filter: this.get('attributes_filter')
			});
			let tpActorAttributeFilter = this.get('tpActorAttributeFilter');
			tpActorAttributeFilter.set('filter', this.get('attributes_filter'));
			this.set('isShowed', false);
			window.scrollTo(0, 0);
		},

		clearFilter() {
			this.set('attributes_filter', []);
			this.get('tpEvent').trigger('tpDataGridFilter', {
				attributes_filter: []
			});
			let tpActorAttributeFilter = this.get('tpActorAttributeFilter');
			tpActorAttributeFilter.set('filter', []);
			this.set('isShowed', false);
			window.scrollTo(0, 0);
		},

		updateFilter(value, attribute)
		{
			let attributes_filter     = this.get('attributes_filter');
			let new_attributes_filter = attributes_filter.filter(function (attr)
			{
				return attr.attribute_type_id != attribute.get('id');
			});
			let new_filter            = this.formatResult(value, attribute);
			if (!Ember.isEmpty(new_filter.value) || !Ember.isEmpty(new_filter.value_from) || !Ember.isEmpty(new_filter.value_to)) {
				new_attributes_filter.push(new_filter);
			}
			this.set('attributes_filter', new_attributes_filter);
		},

		showFilters()
		{
			this.set('isShowed', true);
		},

		hideFilters()
		{
			this.set('isShowed', false);
			window.scrollTo(0,0);
		}
	}
});
