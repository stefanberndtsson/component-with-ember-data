import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.resource('components', function() {
	this.route('new');
	this.route('show', { path: '/:id' });
	this.route('edit', { path: '/edit/:id'});
    });
    this.resource('login');
});

export default Router;
