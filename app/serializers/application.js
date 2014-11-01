import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
    extract: function(store, type, payload, id, requestType) {
	if(payload.meta && payload.meta.notifications) {
	    if(payload.meta.notifications.session_invalid) {
		var session = this.container.lookup('simple-auth-session:main');
		if(session.get('isAuthenticated')) {
		    session.invalidate();
		}
	    }
	}
	return this._super(store, type, payload, id, requestType);
    }
});
