import Ember from 'ember';
import ENV from '../../config/environment';
import ComponentsComponentController from '../components/component';

export default ComponentsComponentController.extend({
    hasFiles: function() {
	return !Ember.$.isEmptyObject(this.get('model.files'));
    }.property('model.files'),
    fileURL: ENV.APP.fileURL
});
