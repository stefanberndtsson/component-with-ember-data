import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.ObjectController.extend({
    needs: ['application'],
    amountsBinding: 'controllers.application.amounts',
    amount: function() {
	var amountObject = this.get('amounts')[this.get('amountId')];
	if(amountObject.get('must_have_value')) {
	    return this.get('amountValue');
	} else {
	    return amountObject.get('name');
	}
    }.property('model'),
    hasFiles: function() {
	return !Ember.$.isEmptyObject(this.get('model.files'));
    }.property('model.files'),
    fileURL: ENV.APP.fileURL,
    descriptionSummary: function() {
	var lines = this.get('model.description').split(/\n/);
	return lines[0];
    }.property('model.description'),
    descriptionRest: function() {
	var lines = this.get('model.description').split(/\n/);
	lines.shift();
	return lines.join('  \n');
    }.property('model.description')
});
