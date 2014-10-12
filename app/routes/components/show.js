import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
	return this.store.find('component', params.id);
    },
    setupController: function(controller, model) {
	controller.set('model', model);
	controller.set('amounts', this.controllerFor('application').get('amounts'));
    }
});
