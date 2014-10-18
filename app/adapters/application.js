import Ember from 'ember';
import DS from "ember-data";

export default DS.ActiveModelAdapter.extend({
    host: "http://localhost:3019",
    ajax: function(url, type, hash) {
	if (Ember.isEmpty(hash)) { hash = {}; }
	if (Ember.isEmpty(hash.data)) { hash.data = {}; }
	hash.data.token = this.container.lookup('route:application').get('session.token');
	return this._super(url, type, hash);
    }
});

DS.Model.reopen({
    idInt: function() {
	if(!this.get('id')) { return undefined; }
	return parseInt(this.get('id'));
    }.property('id')
});
