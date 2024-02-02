import Ember from 'ember';
import config from '../../../config/environment';
const {
  service
} = Ember.inject;

export default Ember.Component.extend({
  notify: service('notify'),

  didRender() {
    this._super(...arguments);
  },

  didDestroyElement() {
    this.set('errorMessage', null);
    this.set('successMessage', null);
    this.set('infoMessage', null);
  },

  didReceiveAttrs() {
    if (this.get('user').get('isAttributeRequired')) {
      this.set('infoMessage', this.i18n.t('actor-attribute.form.attributes.required'));
    }
  },

  getServerEndpoint(attribute) {
    let uriString = '/v1/actors/me/attributes/{attribute_id}';
    uriString = uriString.replace('{attribute_id}', attribute.get('id'));
    return config.APP.API_URL + uriString;
  },

  getPayload(v, attribute) {
    let value;
    if (attribute.get('isComboMulti')) {
      value = v.join();
    } else if (attribute.get('isComboSingle')) {
      value = v;
    } else if (attribute.get('isBoolean')) {
      value = v == 1 ? true : false;
    } else {
      value = v;
    }
    return {
      value: value
    };
  },

  actions: {
    confirm() {
      let user = this.get('user');
      user.set('needRegistrationDetails', false);
      user.save().then(function() {
        this.set('infoMessage', null);
        this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
          radius: true
        });
      }.bind(this));
    },
    updateAttribute(value, attribute) {
      this.get('notify').info(this.i18n.t('general.please.wait').string, {
        radius: true
      });
      const url = this.getServerEndpoint(attribute);
      const data = this.getPayload(value, attribute);
      this.tpAjax.makeRequest('PUT', url, data, 'json').then(function() {
        this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
          radius: true
        });
        let user = this.get('user');
        //user.set('needRegistrationDetails', false);
        user.save();
      }.bind(this), function(error) {
        this.get('notify').error(this.i18n.t('actor-attribute.form.error').string, {
          radius: true
        });
      }.bind(this));
    }
  }
});
