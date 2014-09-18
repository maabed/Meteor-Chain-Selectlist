Template.identityForm.events({
    'change #countries': function(e) {
       Template.statesSelect.change();
    },
    'change #states': function(e) {
       Template.citiesSelect.change();
    },
    'change #cities': function(e) {
       Template.trimsSelect.change();
    }
});

Deps.autorun(function() {
  Meteor.subscribe("locations", function() {
    return Template.countriesSelect.updateUI();
  });
});

Template.countriesSelect.updateUI = function() {
  var ui = $('#countriesSelect select');
  if (ui.length > 0) {
    var options = $('option', ui);
    if (options.length > 0) {
          options.remove();
    }
    return UI.insert(UI.render(Template.countriesSelectOptions), ui[0]);
  }
};

Template.countriesSelectOptions.helpers({
  options: function() {
    var countries = Meteor.Lookups.findOne({
      name: "location_countries"
    });
    if (countries) {
      return countries.values.split('|');
      }
  }
});

Template.countriesSelectOptions.rendered = function() {
    $('#countries.selectpicker').selectpicker();
    $('#countries.selectpicker').selectpicker("refresh");
    $('#countries.selectpicker').selectpicker('val');
   return Template.statesSelect.change();
};

Template.statesSelect.change = function() {
  var country;
  if (country = $('#countries').val()) {
     Meteor.subscribe("locations", country, function() {
      return Template.statesSelect.updateUI();
    });
  }
};

Template.statesSelect.updateUI = function() {
  var ui = $('#statesSelect select');
  var options = $('option', ui);
  if (options.length > 0) {
    options.remove();
  }
  return UI.insert(UI.render(Template.statesSelectOptions), ui[0]);
};

Template.statesSelectOptions.helpers({
    options: function() {
      var country = $('#countries').val();
      var states = Meteor.Lookups.findOne({
        name: "location_" + country + "_states"
      });
      if (country && states) {
        return states.values.split('|');
        } else {
        return [];
      }
  }
});

Template.statesSelectOptions.rendered = function() {
  $('#states.selectpicker').selectpicker();
  $('#states.selectpicker').selectpicker("refresh");
  $('#states.selectpicker').selectpicker('val');
  Template.citiesSelect.change();
};

Template.citiesSelect.change = function() {
  var country = $('#countries').val();
  var state = $('#states').val();
  if (country && state) {
    Meteor.subscribe("locations", country, state, function() {
      return Template.citiesSelect.updateUI();
    });
  }
};

Template.citiesSelect.updateUI = function() {
  var ui = $('#citiesSelect select');
  var options = $('option', ui);
  if (options.length > 0) {
    options.remove();
  }
  return UI.insert(UI.render(Template.citiesSelectOptions), ui[0]);
};

Template.citiesSelectOptions.helpers({
  options: function() {
    var country = $('#countries').val();
    var state = $('#states').val();
    var cities = Meteor.Lookups.findOne({
      name: "location_" + country + "_" + state + "_cities"
    });
    if (country && state && cities) {
      return cities.values.split('|');
    } else {
      return [];
    }
  }
});

Template.citiesSelectOptions.rendered = function() {
  $('#cities.selectpicker').selectpicker();
  $('#cities.selectpicker').selectpicker("refresh");
  $('#cities.selectpicker').selectpicker('val');
};

Template.trimsSelect.change = function() {
  var country = $('#countries').val();
  var state = $('#states').val();
  var city = $('#cities').val();

  if (country && state && city) {
    Meteor.subscribe("locations", country, state, city, function() {
      return Template.trimsSelect.updateUI();
    });
  }
};

Template.trimsSelect.updateUI = function() {
  var ui = $('#trimsSelect select');
  var options = $('option', ui);
  if (options.length > 0) {
    options.remove();
  }
  UI.insert(UI.render(Template.trimsSelectOptions), ui[0]);
};

Template.trimsSelectOptions.helpers({
  options: function() {
    var country = $('#countries').val();
    var state = $('#states').val();
    var city = $('#cities').val();
    var trims = Meteor.Lookups.findOne({
      name: "location_" + country + "_" + state + "_" + city + "_trims"
    });

    if (country && state && city && trims) {
        return trims.values.split('|');
      } else {
          return [];
        }
  }
});

Template.trimsSelectOptions.rendered = function() {
  $('#trims.selectpicker').selectpicker();
  $('#trims.selectpicker').selectpicker("refresh");
  $('#trims.selectpicker').selectpicker('val');
};

