import Ember from 'ember';
import ClassPrefix from 'sl-ember-components/mixins/class-prefix';
import InputBased from 'sl-ember-components/mixins/sl-input-based';
import TooltipEnabled from 'sl-ember-components/mixins/sl-tooltip-enabled';
import layout from 'sl-ember-components/templates/components/sl-select';
import SlSelect from 'sl-ember-components/components/sl-select';
export default SlSelect.extend({
  /**
   * Set up select2 initialization after the element is inserted in the DOM
   *
   * @private
   * @function
   * @returns {undefined}
   */
  setupSelect2: function() {
    const input = this.$('input').select2({
      maximumSelectionSize: this.get('maximumSelectionSize'),
      multiple: this.get('multiple'),
      placeholder: this.get('placeholder'),

      formatResult: (item) => {
        if (!item) {
          return null;
        }

        if (Ember.typeOf(item) !== 'object' && Ember.typeOf(item) !== 'instance') {
          return item;
        }

        const description = Ember.get(
          item,
          this.get('optionDescriptionPath')
        );

        let output = Ember.get(
          item,
          this.get('optionLabelPath')
        );

        if (description) {
          output += ' <span class="text-muted">' +
            description + '</span>';
        }

        return output;
      },

      formatSelection: (item) => {
        if (!item) {
          return null;
        }

        const typeOfItem = Ember.typeOf(item);

        if (
          'object' === typeOfItem ||
          'instance' === typeOfItem
        ) {
          return Ember.get(item, this.get('optionLabelPath'));
        }

        return item;
      },

      id: (item) => {
        let value = item;
        const typeOfItem = Ember.typeOf(item);

        if (
          'object' === typeOfItem ||
          'instance' === typeOfItem
        ) {
          const optionValuePath = this.get('optionValuePath');
          value = Ember.get(item, optionValuePath);
        }

        return value;
      },

      initSelection: (element, callback) => {
        const value = element.val();

        if (!value || !value.length) {
          return callback([]);
        }

        const content = this.get('content');
        const contentLength = content.length;
        const filteredContent = [];
        const multiple = this.get('multiple');
        const optionValuePath = this.get('optionValuePath');
        const values = 'array' === Ember.typeOf(value) ? value : value.split(',');
        let unmatchedValues = values.length;

        for (let i = 0; i < contentLength; i++) {
          const item = content[i];
          const typeOfItem = Ember.typeOf(item);
          const text = 'object' === typeOfItem ||
            'instance' === typeOfItem ?
            Ember.get(item, optionValuePath) :
            item;

          const matchIndex = values.indexOf(text.toString());

          if (matchIndex !== -1) {
            filteredContent[matchIndex] = item;
            if (0 === --unmatchedValues) {
              break;
            }
          }
        }

        if (0 === unmatchedValues) {
          element.select2('readonly', false);
        } else {
          element.select2('readonly', true);

          const warning = 'sl-select:select2#initSelection was' +
            ' not able to map each "' + optionValuePath + '"' +
            ' to an object from "content". The remaining keys' +
            ' are: ' + values + '. The input will be disabled' +
            ' until a) the desired objects are added to the' +
            ' "content" array, or b) the "value" is changed.';

          Ember.warn(warning, !values.length);
        }
        //console.log(filteredContent)
        return callback(
          multiple ?
          filteredContent :
          filteredContent[0]
        );
      },

      minimumResultsForSearch: this.get('disableSearch') ? -1 : 0,

      query: (query) => {
        const content = this.get('content') || [];
        const optionLabelPath = this.get('optionLabelPath');
        const select2 = input.data('select2').opts;

        query.callback({
          results: content.reduce((results, item) => {
            const typeOfItem = Ember.typeOf(item);
            const text = 'object' === typeOfItem ||
              'instance' === typeOfItem ?
              Ember.get(item, optionLabelPath) :
              item;

            if (
              text &&
              select2.matcher(query.term, text.toString())
            ) {
              results.push(item);
            }

            return results;
          }, [])
        });
      }
    });
    input.on('change', () => {
      this.sendAction('action', input.select2('val'), this.get('model'));
      this.set('value', input.select2('val'));
    });

    if (!this.get('multiple')) {
      this.$('input.select2-input').attr(
        'placeholder',
        'Search...'
      );
    }

    this.input = input;
  }
});
