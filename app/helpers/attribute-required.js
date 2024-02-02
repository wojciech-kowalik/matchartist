import Ember from 'ember';

export function attributeRequired(params/*, hash*/) {
  if (params[0] === 'attributes' && params[1] === true) {
    return "active";
  }
  if (params[0] === 'informations' && params[1] === false) {
    return "active";
  }
  if (params[0] === 'informations' && Ember.isEmpty(params[1])) {
    return "active";
  }
  //return params;
}

export default Ember.Helper.helper(attributeRequired);
