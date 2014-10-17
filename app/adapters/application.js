import DS from "ember-data";

export default DS.ActiveModelAdapter.extend({
    host: "http://localhost:3019"
});

DS.Model.reopen({
    idInt: function() {
	if(!this.get('id')) { return undefined; }
	return parseInt(this.get('id'));
    }.property('id')
});
