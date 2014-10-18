import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function(params) {
	var preloadData = params.id;
	if(sessionStorage.getItem('refreshFormData') && sessionStorage.getItem('formData')) {
	    preloadData = JSON.parse(sessionStorage.getItem('formData'));
	}
	sessionStorage.removeItem('routeAfterAuthentication');
	sessionStorage.removeItem('refreshFormData');
	sessionStorage.removeItem('formData');
	sessionStorage.removeItem('formDataId');
	return this.store.find('component', preloadData);
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
		    var controller = that.controllerFor('components.edit');
		    sessionStorage.setItem('routeAfterAuthentication', 'components.edit');
		    var modelData = controller.get('model').toJSON();
		    modelData.id = controller.get('model.id');
		    sessionStorage.setItem('formData', JSON.stringify(modelData));
		    sessionStorage.setItem('formDataId', modelData.id);
		    that.send('invalidateSession');
		} else {
		    that.controller.set('error', true);
		}
	    });
	}
    }
});
