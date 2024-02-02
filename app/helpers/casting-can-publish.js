import Ember from 'ember';

export function castingCanPublish(params/*, hash*/) {
  let questions = params[0];
  let hearings  = params[1];
  let casting   = params[2];
  if (questions > 0 && hearings > 0 && casting.get('published') == false) {
      return true;
  } else {
      return false;
  }

}

export default Ember.Helper.helper(castingCanPublish);
