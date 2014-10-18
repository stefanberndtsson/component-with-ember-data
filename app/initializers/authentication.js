import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import ENV from '../config/environment';

var CustomAuthenticator = Base.extend({
    authenticate: function(credentials) {
	var that = this;
	return new Ember.RSVP.Promise(function(resolve, reject) {
	    Ember.$.ajax({
		type: 'POST',
		url: ENV.APP.authenticationBaseURL,
		data: JSON.stringify({
		    username: credentials.identification,
		    password: credentials.password
		}),
		contentType: 'application/json'
	    }).then(function(response) {
		Ember.run(function() {
		    that.container.lookup('controller:application').set('currentUser', response.user);
		    localStorage.setItem('user', response.user);
		    resolve({ authenticated: true, token: response.access_token });
		});
	    }, function(xhr, status, error) {
		Ember.run(function() {
		    reject(error);
		});
	    });
	});
    },
    invalidate: function() {
	return new Ember.RSVP.Promise(function(resolve) {
	    resolve();
	});
    }
});

export var initialize = function(container) {
  container.register('authenticator:custom', CustomAuthenticator);

};

export default {
  name: 'authentication',
  before: 'simple-auth',
  initialize: initialize
};
