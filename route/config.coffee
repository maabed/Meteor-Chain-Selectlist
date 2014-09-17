Router.map ->
  @route 'home', path: '/'
  @route 'identity', 
    path: 'identity'
    waitOn: -> [ Meteor.subscribe 'identity' ]