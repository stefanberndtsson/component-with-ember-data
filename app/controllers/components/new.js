import Ember from 'ember';

export default Ember.ObjectController.extend({
    needsValue: function() {
	var amountObject = this.get('amounts')[this.get('model.amount_id')];
	if(!amountObject) { return false; }
	return amountObject.get('must_have_value');
    }.property('model.amount_id'),
    actions: {
	addTag: function(data) {
	    var lower = data.toLowerCase();
	    if(!this.get('model.tags')) {
		this.set('model.tags', []);
	    }
	    var tagValue = data;
	    this.get('tagsSelection').forEach(function(item) {
		if(item.get('norm') == lower) {
		    tagValue = item.get('name');
		}
	    });
	    var duplicate = false;
	    this.get('model.tags').forEach(function(item) {
		if(item == tagValue) {
		    duplicate = true;
		}
	    });
	    if(!duplicate) {
		this.get('model.tags').pushObject(tagValue);
	    }
	    this.set('tagInput', '');
	},
	removeTag: function(data) {
	    var newTags = [];
	    this.get('model.tags').forEach(function(item) {
		if(item != data) {
		    newTags.push(item);
		}
	    });
	    this.set('model.tags', newTags);
	}
    }
});
