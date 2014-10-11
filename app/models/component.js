import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    amount_id: DS.attr('number'),
    amount_value: DS.attr('number'),
    spares: DS.attr('boolean')
});
