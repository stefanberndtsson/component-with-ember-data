import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
	return this.store.createRecord('component', {});
    },
    setupController: function(controller, model) {
	controller.set('model', model);
	controller.set('error', false);
	controller.set('amountValueError', false);
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
		if(reason.errors.amountValue) {
		    that.controller.set('amountValueError', reason.errors.amountValue);
		} else {
		    that.controller.set('amountValueError', false);
		}
		console.log("Error", reason.errors);
	    });
	}
    }
});
