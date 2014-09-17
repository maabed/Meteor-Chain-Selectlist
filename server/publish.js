  
Meteor.publish('locations', function(country, state, city) {
  return Meteor.Lookups.find({
    name: {
      $in: ["location_countries", "location_" + country + "_states", "location_" + country + "_" + state + "_cities", "location_" + country + "_" + state + "_" + city + "_trims"]
    }
  });
});