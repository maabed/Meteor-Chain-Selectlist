window.Events = {}

Events.handleNaturally = (e) ->
  e.preventDefault()
  e.stopPropagation()

  Template.updateButtons.created = ->
    Session.set 'formitemChanged', false

  Template.updateButtons.formitemChanged = ->
    Session.get 'formitemChanged'