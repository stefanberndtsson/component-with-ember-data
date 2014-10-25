import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import ENV from '../config/environment';

var CustomAuthenticator = Base.extend({
    refreshIdentifier: null,
    refreshSession: function(token) {
	var that = this;
	Ember.$.ajax({
	    type: 'GET',
	    url: ENV.APP.authenticationBaseURL+'/'+token
	}).then(function(response) {
	    Ember.run(function() {
		var session = that.container.lookup('simple-auth-session:main');
		session.set('username', response.user.username);
		session.set('name', response.user.name);
	    });
	}, function() {
	    var controller = that.container.lookup('controller:application');
	    controller.send('invalidateSession');
	});
	this.refreshIdentifier = Ember.run.later(function() {
	    that.refreshSession(token);
	}, 5000);
    },
    restore: function(properties) {
	var that = this;
	return new Ember.RSVP.Promise(function(resolve, reject) {
	    Ember.$.ajax({
		type: 'GET',
		url: ENV.APP.authenticationBaseURL+'/'+properties.token
	    }).then(function() {
		resolve(properties);
		that.refreshIdentifier = Ember.run.later(function() {
		    that.refreshSession(properties.token);
		}, 5000);
	    }, function() {
		reject();
	    });
	});
    },
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
		var token = response.access_token;
		Ember.run(function() {
		    resolve({
			authenticated: true,
			token: token,
			username: response.user.username,
			name: response.user.name
		    });
		});
		that.refreshIdentifier = Ember.run.later(function() {
		    that.refreshSession(token);
		}, 5000);
	    }, function(xhr, status, error) {
		Ember.run(function() {
		    reject(error);
		});
	    });
	});
    },
    invalidate: function() {
	if(this.refreshIdentifier) {
	    Ember.run.cancel(this.refreshIdentifier);
	    this.refreshIdentifier = null;
	}
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
