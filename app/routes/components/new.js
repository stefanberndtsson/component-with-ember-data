import ComponentsEditRoute from '../components/edit';

export default ComponentsEditRoute.extend({
    model: function() {
	return this.store.createRecord('component', {});
    }
});
