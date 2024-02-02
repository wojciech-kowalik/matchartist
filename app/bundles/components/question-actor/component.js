import Ember from 'ember';
import Config from '../../../config/environment';

/**
 * Question actor component
 *
 * @author wkowalik
 * @version 1.0
 */
export default Ember.Component.extend({

  // ------------------
  // General properties

  /** @type {String[]} */
  classNames: ['question-actor'],

  /** @type {Object} */
  store: Ember.inject.service(),

  /** @type {Object} */
  notify: Ember.inject.service(),

  // ------------------
  // Additional properties

  /** @type {String} */
  uri: Config.components["question-actor"].uri,

  // ------------------
  // Methods

	/**
     * Get server endpoint url
     *
     * @param role
     * @param actor
     * @param question
     * @method getServerEndpoint
     * @return {string}
	 */
  getServerEndpoint(/** Object **/role, /** Object **/actor, /** Object **/question)
  {
    let uriString = this.get('uri')
        .replace('{role_id}', role.get('id'))
        .replace('{actor_id}', actor.get('id'))
        .replace('{question_id}', question.get('id'));

    return Config.APP.API_URL + uriString;
  },

  /**
   * Do request to service
   *
   * @param data
   * @param question
   * @method doRequest
   */
  doRequest(/** Object **/data, /** Object **/question)
  {
    const url = this.getServerEndpoint(this.get('role'), this.get('user.actor'), question);

    this.tpAjax.makeRequest('PUT', url, data, 'json').then(function() {

      this.get('notify').success(this.i18n.t('register.form.congratulations').string, {
        radius: true
      });

    }.bind(this), function(error) {

      this.get('notify').error(this.i18n.t('actor-question.form.error').string, {
        radius: true
      });

    }.bind(this));

  },

  /** @type {Object} */
  actions: {

    /**
     * Save question data
     *
     * @param value
     * @param question
     * @function
     */
    saveQuestion(/** mixed **/value, /** Object **/question)
    {
      this.get('notify').info(this.i18n.t('general.please.wait').string, {
        radius: true
      });

      const data = {};
      let questionValue = (+value === 1) ? true : false;
      this.$().find('.input-'+question.get('id')).addClass('hidden');

      if(questionValue === false){
        this.$().find('.input-'+question.get('id')).removeClass('hidden');
      }

      data.option = questionValue;
      data.role_id = this.get('role.id');
      data.question_id = question.get('id');
      data.actor_id = this.get('user.actor.id');

      this.doRequest(data, question);

    },

    /**
     * Save question comment
     *
     * @param question
     * @function
     */
    saveComment(/** Object **/question)
    {
      this.get('notify').info(this.i18n.t('general.please.wait').string, {
        radius: true
      });

      const data = {};

      data.option = false;
      data.role_id = this.get('role.id');
      data.question_id = question.get('id');
      data.actor_id = this.get('user.actor.id');
      data.comment = this.$().find('.input-'+question.get('id')).find('input').val();

      this.doRequest(data, question);

    }

  }
});
