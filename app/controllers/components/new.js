import Ember from 'ember';

export default Ember.ObjectController.extend({
    needsValue: function() {
	var amountObject = this.get('amounts')[this.get('model.amount_id')];
	if(!amountObject) { return false; }
	return amountObject.get('must_have_value');
    }.property('model.amount_id')
});
