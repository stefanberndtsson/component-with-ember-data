import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
	page: {
	    refreshModel: true
	}
    },
    model: function(params) {
	return this.store.find('component', {page: params.page || 1});
    },
    setupController: function(controller, model) {
	controller.set('model', model);

	if(controller.get('page') > controller.get('model.meta.pagination.pages')) {
	    controller.transitionToRoute('components.index', {queryParams: {page: 1}});
	    controller.set('page', 1);
	}
    }
});
