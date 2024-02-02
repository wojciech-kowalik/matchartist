import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Config from '../../../config/environment';
import ActorAttributeFinder from '../../../mixins/actor-attribute-finder';

export default Ember.Route.extend(
  AuthenticatedRouteMixin,
  ActorAttributeFinder, {
    notify: Ember.inject.service(),
    attributes_filter: [],
    beforeModel() {
      this.get('store').unloadAll('attribute');
    },

    model(params) {
      return Em.RSVP.hash({
        attributes: this.get('store').findAll('attribute'),
        casting: this.get('store').findRecord('casting', params.id),
        roles: this.get('store').query('role', {
          'castingId': params.id
        }),
        stages: this.get('store').query('stage', {
          'castingId': params.id
        })
      });
    },
    afterModel(model) {
      let casting = model.casting;
      if (!casting.get('published')) {
        this.cookie.removeCookie('tab');
        this.cookie.setCookie('tab', '', {
          expires: 7,
          path: '/'
        });
      }
      this.getCastingStep(casting);

      let role = model.roles.get('firstObject');

      let stage = model.stages.get('lastObject');
      if (Em.isEmpty(stage)) {
        //what if stage is empty ?
      } else {
        model.stage = stage;
        model.hearings = this.get('store').query('hearing', {
          'castingId': model.casting.get('id'),
          'stageId': stage.get('id')
        });
      }

      if (Em.isEmpty(role)) {
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
  					{id: 'f', name: 'Female', description: ''},
  					{id: 'm', name: 'Male', description: ''}
  				]
  			});
        model.role = this.get('store').createRecord('role');
        model.role.set('castingId', model.casting.get('id'));
        this.getValuesFromString('{}');
      } else {
        model.role = role;
        model.role.set('castingId', model.casting.get('id'));
        this.set('attributes_filter', JSON.parse(role.get('attributesFilter')));
        this.getValuesFromString(model.role.get('attributesFilter'));
        let questions = this.get('store').query('question', {
          roleId: model.role.get('id')
        });
        model.questions = questions;

        this.controllerFor('casting/edit').set('matchedGridConfiguration', this.matchedGridConfiguration(model));
        this.controllerFor('casting/edit').set('unMatchedGridConfiguration', this.unMatchedgridConfiguration(model));
        this.controllerFor('casting/edit').set('appointedgridConfiguration', this.appointedgridConfiguration(model));
      }
    },

    formatResult(v, attribute) {
  		let result = {};
  		if (attribute.get('builtIn') == true) {
  			result = {
  				attribute_type_id: null,
  				name: attribute.get('name'),
  				value: null,
  				value_from: null,
  				value_to: null,
  				important: true
  			}
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

    getCastingStep(casting) {
      let castingStep = casting.get('setupStep');
      let published = casting.get('published');
      if (!published) {
        if (castingStep == 2) {
          this.controllerFor('casting/edit').set('infoMessage', this.i18n.t('casting.add.step2'));
        } else if (castingStep == 3) {
          this.controllerFor('casting/edit').set('infoMessage', this.i18n.t('casting.add.step3'));
        } else if (castingStep == 4) {
          this.controllerFor('casting/edit').set('infoMessage', this.i18n.t('casting.add.step4'));
        } else if (castingStep == 5) {
          this.controllerFor('casting/edit').set('infoMessage', this.i18n.t('casting.add.step5'));
        }
      }
    },

    appointedgridConfiguration(model) {
      return {
        defaultView: true,
        modelName: 'appointment',
        headerName: 'Appointments',
        gridHeight: 65,
        gridHeader: false,
        gridAsList: false,
        additionals: {
          limit: 10,
          adapter: '',
          parameters: {
            roleId: model.role.get('id')
          }
        },
        columns: [{
          label: 'Avatar',
          valuePath: 'actor',
          width: '80px',
          cellComponent: 'user-avatar'
        }, {
          label: 'Message',
          valuePath: 'self',
          width: '250px',
          cellComponent: 'appointment-content'
        }],
      };
    },

    unMatchedgridConfiguration(model) {
      return {
        defaultView: true,
        modelName: 'actor',
        headerName: 'Unmatched actors',
        gridHeight: 65,
        gridHeader: false,
        gridAsList: false,
        additionals: {
          limit: 10,
          adapter: '',
          parameters: {
            roleId: model.role.get('id'),
            unmatched: true
          }
        },
        columns: [{
          label: 'Avatar',
          valuePath: 'actor',
          width: '80px',
          cellComponent: 'user-avatar'
        }, {
          label: 'Message',
          valuePath: 'self',
          width: '250px',
          cellComponent: 'actor-unmatching-casting-content'
        }],
      };
    },

    matchedGridConfiguration(model) {
      return {
        defaultView: true,
        modelName: 'actor',
        headerName: 'Matched actors',
        gridHeight: 65,
        gridHeader: false,
        gridAsList: false,
        additionals: {
          limit: 10,
          adapter: '',
          parameters: {
            roleId: model.role.get('id'),
            matched: true
          }
        },
        columns: [{
          label: 'Avatar',
          valuePath: 'actor',
          width: '80px',
          cellComponent: 'user-avatar'
        }, {
          label: 'Message',
          valuePath: 'self',
          width: '250px',
          cellComponent: 'actor-matching-casting-content'
        }],
      };
    },

    updateCastingStep(casting, step) {
      if (casting.get('setupStep') < step) {
        casting.set('setupStep', step);
        casting.save().then((castingResponse) => {
          this.get('notify').success(this.i18n.t('general.item.saved').string, {
            radius: true
          });
          this.refresh();
        }).catch((error) => {
          this.get('notify').error(this.i18n.t('register.form.error').string, {
            radius: true
          });
        });
      } else {
        this.get('notify').success(this.i18n.t('general.item.saved').string, {
          radius: true
        });
      }
    },
    actions: {
      setUp(tab) {
        this.cookie.removeCookie('tab_edit');
        this.cookie.setCookie('tab_edit', tab, {
          expires: 7,
          path: '/'
        });
      },
      updateFilter(value, attribute) {
        let attributes_filter = this.get('attributes_filter');
        let new_attributes_filter = attributes_filter.filter(function(attr) {
          if (attr.attribute_type_id != null) {
            return attr.attribute_type_id != attribute.get('id');
          } else {
            return attr.name != attribute.get('name');
          }
        });
        let new_filter = this.formatResult(value, attribute);
        if (!Ember.isEmpty(new_filter.value) || !Ember.isEmpty(new_filter.value_from) || !Ember.isEmpty(new_filter.value_to)) {
          new_attributes_filter.push(new_filter);
        }
        this.set('attributes_filter', new_attributes_filter);
      },
      saveCasting(model) {
        this.get('notify').info(this.i18n.t('general.please.wait').string, {
          radius: true
        });
        model.set('castingCompanyId', 1);
        model.save().then((response) => {
          this.get('notify').success(this.i18n.t('general.item.saved').string, {
            radius: true
          });
          this.transitionTo('casting.edit', response.get('id'));
        }).catch((error) => {
          this.get('notify').error(this.i18n.t('register.form.error').string, {
            radius: true
          });
        });
      },
      saveRole(model) {
        let role = model.role;
        let casting = model.casting;
        if (this.get('attributes_filter').length == 0) {
          this.get('notify').error('Plese fill on or more actor attributes', {
            radius: true
          });
          return;
        }
        this.get('notify').info(this.i18n.t('general.please.wait').string, {
          radius: true
        });
        role.set('attributesFilter', JSON.stringify(this.get('attributes_filter')));
        role.save().then((roleResponse) => {
          this.updateCastingStep(casting, 3);
        }).catch((error) => {
          this.get('notify').error(this.i18n.t('register.form.error').string, {
            radius: true
          });
        });
      },
      confirmQuestions(model) {
        let casting = model.casting;
        let questions = model.questions;
        let err = false;
        questions.forEach(function(item) {
          if (item.get('isNew')) {
            err = true
          }
        });
        if (err === false) {
          this.updateCastingStep(casting, 4);
        } else {
          this.get('notify').error('Please save questions', {
            radius: true
          });
        }
      },
      confirmHearings(model) {
        let casting = model.casting;
        let hearings = model.hearings;
        let err = false;
        if (hearings.get('length') == 0) {
          err = true;
          this.get('notify').error('Please add hearing', {
            radius: true
          });
        }
        hearings.forEach(function(item) {
          if (item.get('isNew')) {
            err = true
            this.get('notify').error('Please save hearings', {
              radius: true
            });
          }
        }.bind(this));
        if (err === false) {
          this.updateCastingStep(casting, 5);
        }
      },
      publish(model) {
        this.get('notify').info(this.i18n.t('general.please.wait').string, {
          radius: true
        });
        let stages = this.get('store').query('stage', {
          'castingId': model.get('id')
        }).then(function(stage) {
          let currentStage = stage.get('lastObject');
          let castingUrl = Config.APP.API_URL + '/v1/castings/' + model.get('id') + '/publish';
          let stageUrl = Config.APP.API_URL + '/v1/castings/' + model.get('id') + '/stages/' + currentStage.get('id') + '/publish';
          this.tpAjax.makeRequest('POST', castingUrl, {}, 'json').then(function() {
            this.cookie.removeCookie('tab');
            this.cookie.setCookie('tab', 'tabMatchedActors',{
              expires: 7,
              path: '/'
            });
            this.tpAjax.makeRequest('POST', stageUrl, {}, 'json').then(function() {
              this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
                radius: true
              });
              this.refresh();
            }.bind(this), function(error) {
              this.get('notify').error(this.i18n.t('actor-attribute.form.error').string, {
                radius: true
              });
            }.bind(this));
          }.bind(this), function(error) {
            this.get('notify').error(this.i18n.t('actor-attribute.form.error').string, {
              radius: true
            });
          }.bind(this));
        }.bind(this));

      },
      invite(model) {
        let role = this.get('controller.model').roles.get('firstObject');
        let data = {};
        let url = Config.APP.API_URL + '/v1/actors/' + model.get('id') + '/invites';
        data.actor_id = model.get('id');
        data.role_id = role.get('id');
        this.tpAjax.makeRequest('POST', url, data, 'json').then(function() {
          this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
            radius: true
          });
          model.action();
        }.bind(this), function(error) {
          this.get('notify').error(this.i18n.t('actor-attribute.form.error').string, {
            radius: true
          });
        }.bind(this));

      }
    }
  });
