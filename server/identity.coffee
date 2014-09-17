Meteor.publish 'identity', ->
  Meteor.People.find { userId: @userId }
  
Meteor.publish 'locations', (country, state, city) ->
  Meteor.Lookups.find { name: ($in: [
    "location_countries",
    "location_#{country}_states",
    "location_#{country}_#{state}_cities",
    "location_#{country}_#{state}_#{city}_trims" ] ) }

Meteor.methods

  setPersonIdentity: (firstName, lastName) ->
    userId = Meteor.userId()
    selector =
      userId: userId
    modifier =
      userId: userId
      firstName: firstName
      lastName: lastName
    Meteor.People.upsert selector, modifier