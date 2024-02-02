import Ember from 'ember';
import Config from '../../../config/environment';

/**
 * Role hearing component
 *
 * @author wkowalik
 * @version 1.0
 */
export default Ember.Component.extend({

  // ------------------
  // General properties

  /** @type {String[]} */
  classNames: ['role-hearing'],

  /** @type {Object} */
  store: Ember.inject.service(),

  /** @type {Object} */
  notify: Ember.inject.service()

});
