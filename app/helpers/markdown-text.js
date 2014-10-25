import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
    return new Ember.Handlebars.SafeString(markdown.toHTML(value));
});
