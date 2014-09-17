Template.identityForm.person = ->
  person = Meteor.People.
     findOne { personId: Meteor.userId() }
  person ? {}

Template.identityForm.events

  'submit form': (e) ->
    Events.handleNaturally e
    firstName = $('#firstName').val()
    lastName = $('#lastName').val()
    country = $('#countries').val()
    state = $('#states').val()
    city = $('#cities').val()
    Meteor.call('setPersonIdentity',
       firstName,lastName,country,state,city)
    Session.set 'formitemChanged', false

  'click .cancel': (e) ->
    Events.handleNaturally e
    form = $('#identityForm')
    form.children().remove()
    UI.insert(UI.render(Template.identityForm),form[0])
    Session.set 'formitemChanged', false

  'keypress, change .formitem': (e) ->
    Session.set 'formitemChanged', true

  'change .changeitem': (e) ->
    Session.set 'formitemChanged', true

  'change #countries': (e) ->
    Template.statesSelect.change()

  'change #states': (e) ->
    Template.citiesSelect.change()

Deps.autorun ->
  Meteor.subscribe("locations", ->
    Template.countriesSelect.updateUI())

Template.countriesSelect.updateUI = ->
  ui = $('#countriesSelect select')
  if ui.length > 0
    options = $('option',ui)
    if options.length > 0
      options.remove()
    UI.insert(UI.render(
         Template.countriesSelectOptions),ui[0])

Template.countriesSelectOptions.helpers
  options: ->
    countries = Meteor.Lookups.
         findOne { name: 'location_countries' }
    if countries
      countries.values.split '|'
    else
      [ ]

Template.countriesSelectOptions.rendered = ->
  changed = Session.get 'formitemChanged'
  $('#countries.selectpicker').selectpicker()
  $('#countries.selectpicker').selectpicker("refresh")
  $('#countries.selectpicker').selectpicker('val',
       Template.identityForm.person().country)
  Session.set 'formitemChanged', changed
  Template.statesSelect.change()

Template.statesSelect.change = ->
  if country = $('#countries').val()
    Meteor.subscribe("locations",country,
         -> Template.statesSelect.updateUI())

Template.statesSelect.updateUI = ->
  ui = $('#statesSelect select')
  options = $('option',ui)
  if options.length > 0
    options.remove()
  UI.insert(UI.render(
       Template.statesSelectOptions),ui[0])

Template.statesSelectOptions.helpers
  options: ->
    country = $('#countries').val()
    states = Meteor.Lookups.
         findOne { name: "location_#{country}_states" }
    if country and states
      states.values.split '|'
    else
      [ ]

Template.statesSelectOptions.rendered = ->
  changed = Session.get 'formitemChanged'
  $('#states.selectpicker').selectpicker()
  $('#states.selectpicker').selectpicker("refresh")
  $('#states.selectpicker').selectpicker('val',
       Template.identityForm.person().state)
  Session.set 'formitemChanged', changed
  Template.citiesSelect.change()

Template.citiesSelect.change = ->
  country = $('#countries').val()
  state = $('#states').val()
  if country && state
    Meteor.subscribe("locations",country,state,
         -> Template.citiesSelect.updateUI())

Template.citiesSelect.updateUI = ->
  ui = $('#citiesSelect select')
  options = $('option',ui)
  if options.length > 0
    options.remove()
  UI.insert(UI.render(
       Template.citiesSelectOptions),ui[0])

Template.citiesSelectOptions.helpers
  options: ->
    country = $('#countries').val()
    state = $('#states').val()
    cities = Meteor.Lookups.
         findOne { name:
             "location_#{country}_#{state}_cities" }
    if country && state && cities
      cities.values.split '|'
    else
      [ ]

Template.citiesSelectOptions.rendered = ->
  changed = Session.get 'formitemChanged'
  $('#cities.selectpicker').selectpicker()
  $('#cities.selectpicker').selectpicker("refresh")
  $('#cities.selectpicker').selectpicker('val',
       Template.identityForm.person().city)
  Session.set 'formitemChanged', changed