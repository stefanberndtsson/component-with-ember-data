import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
	return this.store.find('component', params.id);
    },
    setupController: function(controller, model) {
	controller.set('model', model);
	controller.set('error', false);
	controller.set('model.amountId', model.get('amountCode').toString());
    },
    actions: {
	saveComponent: function(component) {
	    var that = this;
	    component.save().then(function(newModel) {
		newModel.unloadRecord();
		that.store.find('tag').then(function(tags) {
		    that.controllerFor('application').set('tagsSelection', tags);
		});
		that.transitionTo('components.show', newModel.id);
	    },function(reason) {
		that.controller.set('error', true);
	    });
	}
    }
});