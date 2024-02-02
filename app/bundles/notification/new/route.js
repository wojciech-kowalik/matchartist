import Ember from 'ember';
import ResetScrollMixin from '../../../mixins/reset-scroll-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
});
