import Ember from 'ember';

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
    }.property('model.files')
});
