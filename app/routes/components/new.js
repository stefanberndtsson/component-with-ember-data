import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
	return this.store.createRecord('component', {});
    },
    setupController: function(controller, model) {
	controller.set('model', model);
	controller.set('amounts', this.controllerFor('application').get('amounts'));
	controller.set('amountsSelection', this.controllerFor('application').get('amountsSelection'));
	controller.set('tagsSelection', this.controllerFor('application').get('tagsSelection'));
    },
    actions: {
	saveComponent: function(component) {
	    var that = this;
	    component.save().then(function(newModel) {
		newModel.unloadRecord();
		that.transitionTo('components.show', newModel.id);
	    });
	}
    }
});
