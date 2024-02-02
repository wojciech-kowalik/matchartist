import Ember from 'ember';

export function formatedDate(params/*, hash*/) {
  return moment(params[0]).format(params[1]);
}

export default Ember.Helper.helper(formatedDate);
