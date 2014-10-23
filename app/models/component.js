import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    amountId: DS.attr('number'),
    amountValue: DS.attr('number'),
    spares: DS.attr('boolean'),
    tags: DS.attr('object'),
    files: DS.attr('object')
});
