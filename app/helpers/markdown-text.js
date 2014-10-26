import Ember from "ember";
import markdown from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value) {
    return new Ember.Handlebars.SafeString(markdown.toHTML(value));
});
