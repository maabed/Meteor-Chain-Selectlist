Template.searchForm.events({
    'change #makers': function(e) {
       Template.modelsSelect.change();
    },
    'change #models': function(e) {
       Template.yearsSelect.change();
    },
    'change #years': function(e) {
       Template.trimsSelect.change();
    }
});

Deps.autorun(function() {
  Meteor.subscribe("cars", function() {
    return Template.makersSelect.updateUI();
  });
});

Template.makersSelect.updateUI = function() {
  var ui = $('#makersSelect select');
  if (ui.length > 0) {
    var options = $('option', ui);
    if (options.length > 0) {
          options.remove();
    }
    return Blaze.render(Template.makersSelectOptions, ui[0]);
  }
};

Template.makersSelectOptions.helpers({
  options: function() {
    var makers = Meteor.Lookups.findOne({
      name: "car_makers"
    });
    if (makers) {
      return makers.values.split('|');
      } else {
        return [];
      }
  }
});

Template.makersSelectOptions.rendered = function() {
    $('#makers.selectpicker').selectpicker();
    $('#makers.selectpicker').selectpicker("refresh");
    $('#makers.selectpicker').selectpicker('val');
   return Template.modelsSelect.change();
};

Template.modelsSelect.change = function() {
  var make;
  if (make = $('#makers').val()) {
     Meteor.subscribe("cars", make, function() {
      return Template.modelsSelect.updateUI();
    });
  }
};

Template.modelsSelect.updateUI = function() {
  var ui = $('#modelsSelect select');
  var options = $('option', ui);
  if (options.length > 0) {
    options.remove();
  }
  return Blaze.render(Template.modelsSelectOptions, ui[0]);
};


//Check why is the makeer repeated twice
Template.modelsSelectOptions.helpers({
    options: function() {
      var make = $('#makers').val();
      var models = Meteor.Lookups.findOne({
        name: make + "_models"
      });
      console.log(make);
      console.log(models);
      if (make && models) {
        return models.values.split('|');
        } else {
        return [];
      }
  }
});

Template.modelsSelectOptions.rendered = function() {
  $('#models.selectpicker').selectpicker();
  $('#models.selectpicker').selectpicker("refresh");
  $('#models.selectpicker').selectpicker('val');
  Template.yearsSelect.change();
};

Template.yearsSelect.change = function() {
  var make = $('#makers').val();
  var model = $('#models').val();
  if (make && model) {
    Meteor.subscribe("cars", make, model, function() {
      return Template.yearsSelect.updateUI();
    });
  }
};

Template.yearsSelect.updateUI = function() {
  var ui = $('#yearsSelect select');
  var options = $('option', ui);
  if (options.length > 0) {
    options.remove();
  }
  return Blaze.render(Template.yearsSelectOptions, ui[0]);
};

Template.yearsSelectOptions.helpers({
  options: function() {
    var make = $('#makers').val();
    var model = $('#models').val();
    var years = Meteor.Lookups.findOne({
      name: make + "_" + model + "_years"
    });
    if (make && model && years) {
      return years.values.split('|');
    } else {
      return [];
    }
  }
});

Template.yearsSelectOptions.rendered = function() {
  $('#years.selectpicker').selectpicker();
  $('#years.selectpicker').selectpicker("refresh");
  $('#years.selectpicker').selectpicker('val');
};

Template.trimsSelect.change = function() {
  var make = $('#makers').val();
  var model = $('#models').val();
  var year = $('#years').val();

  if (make && model && year) {
    Meteor.subscribe("cars", make, model, year, function() {
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
  Blaze.render(Template.trimsSelectOptions, ui[0]);
};

Template.trimsSelectOptions.helpers({
  options: function() {
    var make = $('#makers').val();
    var model = $('#models').val();
    var year = $('#years').val();
    var trims = Meteor.Lookups.findOne({
      name: make + "_" + model + "_" + year + "_trims"
    });

    if (make && model && year && trims) {
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

