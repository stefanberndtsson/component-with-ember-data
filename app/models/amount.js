import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    can_have_spares: DS.attr('boolean'),
    must_have_value: DS.attr('boolean')
});
