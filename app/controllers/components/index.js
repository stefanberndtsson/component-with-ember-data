import Ember from 'ember';

export default Ember.ArrayController.extend({
    itemController: 'components.component',
    sortProperties: ['name']
});
