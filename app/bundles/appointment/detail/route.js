import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ActorAttributeFinder from '../../../mixins/actor-attribute-finder';
import Config from '../../../config/environment';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';

export default Ember.Route.extend(
  AuthenticatedRouteMixin,
  ActorAttributeFinder, ResetScrollMixin, {

    notify: Ember.inject.service(),

    model(params) {
      this.get('store').unloadAll('actor');
      this.get('store').unloadAll('question');
      return Em.RSVP.hash({
        appointment: this.get('store').queryRecord('appointment', {
          hearingId: params.hearingId,
          appointmentId: params.appointmentId
        }),
        role: this.get('store').findRecord('role', params.roleId),
        profile: this.get('store').findRecord('actor', params.actorId),
        attributes: this.get('store').findAll('attribute'),
        actorAttributes: this.get('store').query('actorAttribute', {
          id: params.actorId
        }),
        questions: this.get('store').query('question', {
          roleId: params.roleId,
          actorId: params.actorId,
        }),
      });
    },
    afterModel(data) {
      let attributes = data.attributes;
      let actorAttribute = data.actorAttributes;
      this.getValuesToString(actorAttribute);

      let actor = data.profile;
      let user = actor.get('user');
      let files = this.get('store').query('file', {
        type: 'actor',
        id: user.id
      });

      files.then(function(response) {
        actor.set('files', response);
      });
    },
    actions: {
      acceptAppointment(model) {
        let url = Config.APP.API_URL + '/v1/hearings/' + model.get('hearingId') + '/appointments/' + model.get('id') + '/accept';
        this.get('notify').info(this.i18n.t('general.please.wait').string, {
          radius: true
        });
        this.tpAjax.makeRequest('POST', url, {}, 'json').then(function() {
          this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
            radius: true
          });
        }.bind(this), function(error) {
          this.get('notify').error(this.i18n.t('actor-attribute.form.error').string, {
            radius: true
          });
        }.bind(this));
      },
      rejectAppointment(model) {
        let url = Config.APP.API_URL + '/v1/hearings/' + model.get('hearingId') + '/appointments/' + model.get('id') + '/accept';
        this.get('notify').info(this.i18n.t('general.please.wait').string, {
          radius: true
        });
        this.tpAjax.makeRequest('POST', url, {}, 'json').then(function() {
          this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
            radius: true
          });
        }.bind(this), function(error) {
          this.get('notify').error(this.i18n.t('actor-attribute.form.error').string, {
            radius: true
          });
        }.bind(this));
      },
      actorAccept(actorId, roleId) {
        let url = Config.APP.API_URL + '/v1/roles/' + roleId + '/actors/' + actorId + '/qualify_to_role';
        this.get('notify').info(this.i18n.t('general.please.wait').string, {
          radius: true
        });
        this.tpAjax.makeRequest('POST', url, {}, 'text').then(function() {
          this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
            radius: true
          });
        }.bind(this), function(error) {
          this.get('notify').error(this.i18n.t('actor-attribute.form.error').string, {
            radius: true
          });
        }.bind(this));
      },
      actorReject(actorId, roleId) {
        let url = Config.APP.API_URL + '/v1/roles/' + roleId + '/actors/' + actorId + '/reject';
        this.get('notify').info(this.i18n.t('general.please.wait').string, {
          radius: true
        });
        this.tpAjax.makeRequest('POST', url, {}, 'text').then(function() {
          this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
            radius: true
          });
        }.bind(this), function(error) {
          this.get('notify').error(this.i18n.t('actor-attribute.form.error').string, {
            radius: true
          });
        }.bind(this));
      }
    }
  });
