import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
	page: {
	    refreshModel: true
	},
	query: {
	    refreshModel: true
	}
    },
    model: function(params) {
	if(!params.page) {
	    params.page = 1;
	}
	return this.store.find('result', params);
    },
    setupController: function(controller, model) {
	controller.set('model', model);

	if(controller.get('page') > controller.get('model.meta.pagination.pages')) {
	    controller.transitionToRoute('components.index', {queryParams: {page: 1}});
	    controller.set('page', 1);
	}
    },
    actions: {
	search: function(query) {
	    console.log("Query:", query);
	    this.transitionTo('components.index', {queryParams: {query: query}});
	}
    }
});
