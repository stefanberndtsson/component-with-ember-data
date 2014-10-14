import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement: function() {
	if(!this.get('tagValue')) {
	    console.log("Setting tagValue...");
	    this.set('tagValue', []);
	}
    },
    actions: {
    },
});
