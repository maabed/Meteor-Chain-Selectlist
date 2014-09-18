  
Meteor.publish('cars', function(make, model, year) {
  return Meteor.Lookups.find({
    name: {
      $in: ["car_makers", 
      		make + "_models", 
      		make + "_" + model + "_years", 
      		make + "_" + model + "_" + year + "_trims"]
    }
  });
});

Meteor.publish('identity', function() {
  return Meteor.People.find({
    userId: this.userId
  });
});
