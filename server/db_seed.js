var assertLookups;

Meteor.startup(function() {
  return assertLookups();
});

assertLookups = function() {
  if (Meteor.Lookups.find().count() === 0) {
    Meteor.Lookups.insert({
      name: 'car_makers',
      values: 'Audi'
    });
    Meteor.Lookups.insert({
      name: 'Audi_models',
      values: 'A4|A6|A8'
    });
    Meteor.Lookups.insert({
      name: 'Audi_A4_years',
      values: '2009|2010|2011'
    });
    Meteor.Lookups.insert({
      name: 'Audi_A6_years',
      values: '2010|2011|2012'
    });
    Meteor.Lookups.insert({
      name: 'Audi_A4_2009_trims',
      values: 'Base|Sport'
    });
    Meteor.Lookups.insert({
      name: 'Audi_A4_2010_trims',
      values: 'Base|Sport'
    });
    Meteor.Lookups.insert({
      name: 'Audi_A6_2010_trims',
      values: '2.0T Premium Plus|3.0T Premium Plus'
    });
    Meteor.Lookups.insert({
      name: 'Audi_A6_2011_trims',
      values: '2.0T Premium Plus|3.0T Premium Plus|TDI Prestige'
    });

  }
};