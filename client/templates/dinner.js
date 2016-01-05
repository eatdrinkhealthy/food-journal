Template.dinner.onRendered(function () {
  $('#dinner-timepicker-container').datetimepicker({
    format: 'h:mm A'
  });
});

Template.dinner.helpers({
  dinnerSatisfyingSelected: function (listItem) {
    // For optional boolean fields, we display them as yes / no / '' so
    // that we can show an empty string if field has not been set
    // (since it is not a required field)

    var compareStr = '';   // default to 'not set' (null)

    var dinnerData =Template.instance().data.dinner;
    if (dinnerData) {
      // explicitly check for true or false boolean values (as opposed to just truthy/falsy)
      compareStr = convertBooleanToYesNoEmpty(dinnerData.satisfying);
    }

    return listItem === compareStr ? 'selected' : '';
  },

  dinnerSnackAfterSelected: function (listItem) {
    // For optional boolean fields, we display them as yes / no / '' so
    // that we can show an empty string if field has not been set
    // (since it is not a required field)

    var compareStr = '';   // default to 'not set' (null)

    var dinnerData =Template.instance().data.dinner;
    if (dinnerData) {
      // explicitly check for true or false boolean values (as opposed to just truthy/falsy)
      compareStr = convertBooleanToYesNoEmpty(dinnerData.snackAfter);
    }

    return listItem === compareStr ? 'selected' : '';
  },

  dinnerMoodSelected: function (listItem) {

    // if the dinner mood field is not set (undefined or null), use an empty string for comparison
    var compareStr = '';
    if (Template.instance().data.dinner) {
      compareStr = Template.instance().data.dinner.mood || '';
    }

    return listItem === compareStr ? 'selected' : '';
  }
});
