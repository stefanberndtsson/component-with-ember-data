import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: ['application'],
    amountsBinding: 'controllers.application.amounts',
    itemController: 'components.component',
    queryParams: ['page', 'query'],
    sortProperties: ['name'],
    pageArray: function() {
	var pArray = [];
	for(var i=0;i<this.get('model.meta.pagination.pages');i++) {
	    var p = {page: i+1};
	    if(this.get('model.meta.pagination.page') === i+1) {
		p['active'] = true;
	    }
	    pArray.push(p);
	}
	return Ember.ArrayProxy.create({content: Ember.A(pArray)});
    }.property('model.meta.pagination.pages', 'model.meta.pagination.page')
});
