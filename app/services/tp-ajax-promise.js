import Ember from 'ember';

export default Ember.Service.extend({

    session: Ember.inject.service(),

    makeRequest(method,url,data,dataType) {
        let auth = this.get('session').get('data.authenticated');
        return new Ember.RSVP.Promise(function (resolve, reject) {
            Ember.$.ajax({
                url: url,
                type: method,
                dataType: dataType,
                data,
                headers: {
                  'access-token': auth['access-token'],
                  'client': auth['client'],
                  'uid': auth['uid']
                },
                beforeSend(xhr, settings) {
                    xhr.setRequestHeader('Accept', settings.accepts.json);
                },
                success(response) {
                    resolve(response);
                },
                error(reason) {
                    reject(reason);
                }
            });
        });
    },
});
