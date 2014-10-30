import ComponentsComponentController from '../components/component';

export default ComponentsComponentController.extend({
    actions: {
	addTag: function(data) {
	    var lower = data.toLowerCase();
	    if(!this.get('model.tags')) {
		this.set('model.tags', []);
	    }
	    var tagValue = data;
	    this.get('tagsSelection').forEach(function(item) {
		if(item.get('norm') === lower) {
		    tagValue = item.get('name');
		}
	    });
	    var duplicate = false;
	    this.get('model.tags').forEach(function(item) {
		if(item.toLowerCase() === tagValue.toLowerCase()) {
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
		if(item !== data) {
		    newTags.push(item);
		}
	    });
	    this.set('model.tags', newTags);
	}
    }
});
