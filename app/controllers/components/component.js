import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['application'],
    tagsSelectionBinding: 'controllers.application.tagsSelection',
    amountsBinding: 'controllers.application.amounts',
    amountsSelectionBinding: 'controllers.application.amountsSelection',
    isMobileBinding: 'controllers.application.isMobile',
    isDesktopBinding: 'controllers.application.isDesktop',
    needsValue: function() {
	var amountObject = this.get('amounts')[this.get('model.amountId')];
	if(!amountObject) { return false; }
	return amountObject.get('must_have_value');
    }.property('model.amountId'),
    descriptionSummary: function() {
	if(!this.get('model.description')) {
	    return "";
	}
	var lines = this.get('model.description').split(/\n/);
	return lines[0];
    }.property('model.description'),
    descriptionRest: function() {
	if(!this.get('model.description')) {
	    return "";
	}
	var lines = this.get('model.description').split(/\n/);
	lines.shift();
	return lines.join('  \n');
    }.property('model.description'),
    amount: function() {
	if(!this.get('amountId')) {
	    return undefined;
	}
	var amountObject = this.get('amounts')[this.get('amountId')];
	if(amountObject.get('must_have_value')) {
	    return this.get('amountValue');
	} else {
	    return amountObject.get('name');
	}
    }.property('model', 'model.amountId', 'model.amountValue'),
    tagsArray: function() {
	return this.get('model.tags').map(function(item) {
	    return {name: item, query: 'tags:'+item};
	});
    }.property('model.tags')
});
