import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
	var preloadData = {};
	if(sessionStorage.getItem('refreshFormData') && sessionStorage.getItem('formData')) {
	    preloadData = JSON.parse(sessionStorage.getItem('formData'));
	}
	sessionStorage.removeItem('routeAfterAuthentication');
	sessionStorage.removeItem('refreshFormData');
	sessionStorage.removeItem('formData');
	return this.store.createRecord('component', preloadData);
    },
    setupController: function(controller, model) {
	controller.set('model', model);
	controller.set('error', false);
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
		if(reason.status == 401) {
		    var controller = that.controllerFor('components.new');
		    sessionStorage.setItem('routeAfterAuthentication', 'components.new');
		    sessionStorage.setItem('formData', JSON.stringify(controller.get('model').toJSON()));
		    that.send('invalidateSession');
		} else {
		    that.controller.set('error', true);
		}
	    });
	}
    }
});
