import Ember from 'ember';

export default Ember.Mixin.create({

  getValues(actorAttribute) {
    actorAttribute.forEach((data) => {
      let attr = this.get('store').peekRecord('attribute', data.get('attribute.id'));
      attr.set('value', data.get('value'));
    });
  },
  getValuesFromString(actorAttribute) {
    actorAttribute = JSON.parse(actorAttribute);
    let attributes = this.get('store').peekAll('attribute');
    attributes.forEach((rec) => {
      rec.set('value', null);
      rec.set('valueFrom', null);
      rec.set('valueTo', null);
    });
    if (Em.isArray(actorAttribute)) {
      actorAttribute.forEach((data) => {
        if (!Ember.isEmpty(data.attribute_type_id)) {
          let attr = this.get('store').peekRecord('attribute', data.attribute_type_id);
          if (data.value != null) {
            attr.set('value', data.value);
          }
          if (data.value_from != null) {
            attr.set('valueFrom', data.value_from);
          }
          if (data.value_to != null) {
            attr.set('valueTo', data.value_to);
          }
        } else {
          this.get('store').createRecord('attribute', {
    				name: data.name,
    				builtIn: true,
    				description: '',
    				value: data.value,
    				valueFrom: data.value_from,
    				valueTo: data.value_to,
    				important: true,
    				attrType: data.name == 'age' ? 'range_int' : 'combo_single',
            comboOptions: [
    					{id: 'f', name: 'Female', description: ''},
    					{id: 'm', name: 'Male', description: ''}
    				]
    			});
        }
      });
    }
  },
  getValuesToString(actorAttribute) {
    actorAttribute.forEach((data) => {
      let attr = this.get('store').peekRecord('attribute', data.get('attribute.id'));
      if (!Em.isEmpty(attr)) {
        if (attr.get('isComboSingle')) {
          attr.get('comboOptions').forEach((option) => {
            if (option.id == data.get('value')) {
              attr.set('value', option.name);
              return;
            }
          });
        } else if (attr.get('isComboMulti')) {
          let values = data.get('value').split(",");
          let names = [];
          attr.get('comboOptions').forEach((option) => {
            if (values.indexOf(option.id.toString()) !== -1) {
              names.push(option.name);
            }
          });
          attr.set('value', names.join(", "));
        } else if (attr.get('isBoolean')) {
          let value = data.get('value') ? this.i18n.t('tp-boolean.choice.label.yes') : this.i18n.t('tp-boolean.choice.label.no');
          attr.set('value', value);
        } else if (attr.get('isTrilean')) {
          switch (data.get('value')) {
            case true:
              attr.set('value', this.i18n.t('tp-trilean.choice.label.yes'));
              break;
            case false:
              attr.set('value', this.i18n.t('tp-trilean.choice.label.no'));
              break;
            case 'maybe':
              attr.set('value', this.i18n.t('tp-trilean.choice.label.null'));
              break;
          }
        } else {
          attr.set('value', data.get('value'));
        }
      }
    });
  },
  getMainAttributes() {
    let weight = this.get('store').peekRecord('attribute', 17);
    let height = this.get('store').peekRecord('attribute', 16);
    let eyeColor = this.get('store').peekRecord('attribute', 23);
    eyeColor.get('comboOptions').forEach((option) => {
      if (option.id == eyeColor.get('value')) {
        let ec = option.name.split("(");
        this.controllerFor('profile').set('mainAttr.eyeColor',ec[0]);
        return;
      }
    });
    this.controllerFor('profile').set('mainAttr.height',height.get('value'));
    this.controllerFor('profile').set('mainAttr.weight',weight.get('value'));
  }
});
