import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Route.extend({
    model: function(params) {
	return this.store.find('component', params.id);
    },
    setupController: function(controller, model) {
	controller.set('model', model);
    },
    actions: {
	upload: function(fileUploadId) {
	    Ember.$('#upload'+fileUploadId).click();
	},
	removeAsset: function(component, assetId) {
	    var session = this.get('session');
	    Ember.$.ajax({
		type: 'DELETE',
		url: ENV.APP.fileURL+'/'+assetId+'?token='+session.get('token')
	    }).then(function() {
		component.reload();
	    });
	}
    }
});
