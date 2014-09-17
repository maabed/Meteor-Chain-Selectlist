var assertLookups;

Meteor.startup(function() {
  return assertLookups();
});

assertLookups = function() {
  if (Meteor.Lookups.find().count() === 0) {
    Meteor.Lookups.insert({
      name: 'location_countries',
      values: 'United States'
    });
    Meteor.Lookups.insert({
      name: 'location_United States_states',
      values: 'Alabama|Alaska'
    });
    Meteor.Lookups.insert({
      name: 'location_United States_Alabama_cities',
      values: 'Valley|Wetumpka'
    });
    Meteor.Lookups.insert({
      name: 'location_United States_Alaska_cities',
      values: 'Anchorage|Bethel'
    });
    Meteor.Lookups.insert({
      name: 'location_United States_Alabama_Valley_trims',
      values: 'Boaz|College'
    });
    Meteor.Lookups.insert({
      name: 'location_United States_Alabama_Wetumpka_trims',
      values: 'Fairbanks|Juneau'
    });
    Meteor.Lookups.insert({
      name: 'location_United States_Alaska_Anchorage_trims',
      values: 'Boaz|College'
    });
    Meteor.Lookups.insert({
      name: 'location_United States_Alaska_Bethel_trims',
      values: 'Fairbanks|Juneau'
    });

  }
};