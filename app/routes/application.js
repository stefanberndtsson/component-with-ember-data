import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
	console.log("ApplicationRoute.model");
	return this.store.find('amount');
    },
    setupController: function(controller, model) {
	controller.set('amounts', {});
	controller.set('amountsSelection', model);
	model.forEach(function(item) {
	    controller.set('amounts.'+item.id, item);
	});
    }
});
