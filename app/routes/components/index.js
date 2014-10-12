import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function() {
	this.store.unloadAll('component');
    },
    model: function() {
	return this.store.find('component');
    },
    setupController: function(controller, model) {
	controller.set('model', model);
	controller.set('amounts', this.controllerFor('application').get('amounts'));
    }
});
