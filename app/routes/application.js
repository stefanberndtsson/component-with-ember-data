import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    model: function() {
	console.log("ApplicationRoute.model");
	var that = this;
	return Ember.RSVP.hash({
	    amount: that.store.find('amount'),
	    tag: that.store.find('tag')
	});
    },
    setupController: function(controller, model) {
	controller.set('content', {});
	controller.set('amounts', {});
	controller.set('amountsSelection', model.amount);
	controller.set('tagsSelection', model.tag);
	model.amount.forEach(function(item) {
	    controller.set('amounts.'+item.id, item);
	});
    },
    actions: {
	sessionAuthenticationSucceeded: function() {
	    var nextRoute = sessionStorage.getItem('routeAfterAuthentication');
	    sessionStorage.removeItem('routeAfterAuthentication');
	    if(nextRoute) {
		if(sessionStorage.getItem('formDataId')) {
		    var formDataId = sessionStorage.getItem('formDataId');
		    sessionStorage.removeItem('formDataId')
		    this.transitionTo(nextRoute, formDataId);
		} else {
		    sessionStorage.setItem('refreshFormData', true);
		    this.transitionTo(nextRoute);
		}
	    } else {
		return this._super();
	    }
	},
	sessionInvalidationSucceeded: function() {
	    var nextRoute = sessionStorage.getItem('routeAfterAuthentication');
	    var formData = sessionStorage.getItem('formData');
	    if(nextRoute) {
		this.send('authenticateSession');
	    } else {
		this.transitionTo('components.index');
	    }
	},
	sessionAuthenticationFailed: function(error) {
	    this.controllerFor('login').set('error', error);
	},
    }
});
