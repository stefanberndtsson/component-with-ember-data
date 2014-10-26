import Ember from 'ember';

export default Ember.ObjectController.extend({
    amount: function() {
	var amountObject = this.parentController.get('amounts')[this.get('amountId')];
	if(amountObject.get('must_have_value')) {
	    return this.get('amountValue');
	} else {
	    return amountObject.get('name');
	}
    }.property('model'),
    descriptionSummary: function() {
	var lines = this.get('model.description').split(/\n/);
	return lines[0];
    }.property('model.description'),
    tagsArray: function() {
	return this.get('model.tags').map(function(item) {
	    return {name: item, query: 'tags:'+item};
	});
    }.property('model.tags')
});
