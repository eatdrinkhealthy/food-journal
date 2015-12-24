Template.breakfast.onRendered(function () {
  $('#breakfast-timepicker-container').datetimepicker({
    format: 'h:mm A'
  });
});

Template.breakfast.helpers({
  breakfastSatisfyingSelected: function (listItem) {
    // For optional boolean fields, we display them as yes / no / '' so
    // that we can show an empty string if field has not been set
    // (since it is not a required field)

    var compareStr = '';   // default to 'not set' (null)

    var breakfastData =Template.instance().data.breakfast;
    if (breakfastData) {
      // explicitly check for true or false boolean values (as opposed to just truthy/falsy)
      compareStr = convertBooleanToYesNoEmpty(breakfastData.satisfying);
    }

    return listItem === compareStr ? 'selected' : '';
  },

  breakfastSnackAfterSelected: function (listItem) {
    // For optional boolean fields, we display them as yes / no / '' so
    // that we can show an empty string if field has not been set
    // (since it is not a required field)

    var compareStr = '';   // default to 'not set' (null)

    var breakfastData =Template.instance().data.breakfast;
    if (breakfastData) {
      // explicitly check for true or false boolean values (as opposed to just truthy/falsy)
      compareStr = convertBooleanToYesNoEmpty(breakfastData.snackAfter);
    }

    return listItem === compareStr ? 'selected' : '';
  },

  breakfastMoodSelected: function (listItem) {

    // if the breakfast mood field is not set (undefined or null), use an empty string for comparison
    var compareStr = '';
    if (Template.instance().data.breakfast) {
      compareStr = Template.instance().data.breakfast.mood || '';
    }

    return listItem === compareStr ? 'selected' : '';
  }
});
