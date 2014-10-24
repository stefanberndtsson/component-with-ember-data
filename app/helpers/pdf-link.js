import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Handlebars.makeBoundHelper(function(id, name){
    var escapedName = Ember.Handlebars.Utils.escapeExpression(name);
    var img = "<img src=\"/img/pdf-file-128.png\" height=\"24\"/>";
    var str = "<a target=\"_blank\" href=\""+ENV.APP.fileURL+"/"+id+"\">"+img+"</a>";
    return new Ember.Handlebars.SafeString(str);
});
