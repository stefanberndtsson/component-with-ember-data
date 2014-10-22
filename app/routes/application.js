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
	    return this._super();
	},
	sessionInvalidationSucceeded: function() {
	    this.transitionTo('components.index');
//	    return this._super();
	},
	sessionAuthenticationFailed: function(error) {
	    this.controllerFor('login').set('error', error);
	},
    }
});
