import Ember from 'ember';

export default Ember.ArrayController.extend({
    itemController: 'components.component',
    amountx: function() {
	console.log("DEBUG");
	return 'ComponentsIndexController';
    }.property('model')
});
