import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.FileField.extend({
    url: '',
    multiple: true,
    filesDidChange: (function() {
	var serviceUrl = ENV.APP.serviceURL;
	var files = this.get('files');
	var componentId = this.get('componentId');
	var dataType = this.get('dataType');
	var uploadUrl = serviceUrl+"/asset_data";
	var token = this.container.lookup('simple-auth-session:main').get('token');

	if(!token) { return; }

	var uploader = Ember.Uploader.create({
	    url: uploadUrl
	});

	uploader.on('progress', function(ev) {
	    console.log("Upload progress: ", ev.percent);
	});

	if (!Ember.isEmpty(files)) {
	    uploader.upload(files[0], {component_id: componentId, data_type: dataType, token: token});
	}
    }).observes('files')
});
