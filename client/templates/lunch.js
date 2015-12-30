Template.lunch.onRendered(function () {
  $('#lunch-timepicker-container').datetimepicker({
    format: 'h:mm A'
  });
});

Template.lunch.helpers({
  lunchSatisfyingSelected: function (listItem) {
    // For optional boolean fields, we display them as yes / no / '' so
    // that we can show an empty string if field has not been set
    // (since it is not a required field)

    var compareStr = '';   // default to 'not set' (null)

    var lunchData =Template.instance().data.lunch;
    if (lunchData) {
      // explicitly check for true or false boolean values (as opposed to just truthy/falsy)
      compareStr = convertBooleanToYesNoEmpty(lunchData.satisfying);
    }

    return listItem === compareStr ? 'selected' : '';
  },

  lunchSnackAfterSelected: function (listItem) {
    // For optional boolean fields, we display them as yes / no / '' so
    // that we can show an empty string if field has not been set
    // (since it is not a required field)

    var compareStr = '';   // default to 'not set' (null)

    var lunchData =Template.instance().data.lunch;
    if (lunchData) {
      // explicitly check for true or false boolean values (as opposed to just truthy/falsy)
      compareStr = convertBooleanToYesNoEmpty(lunchData.snackAfter);
    }

    return listItem === compareStr ? 'selected' : '';
  },

  lunchMoodSelected: function (listItem) {

    // if the lunch mood field is not set (undefined or null), use an empty string for comparison
    var compareStr = '';
    if (Template.instance().data.lunch) {
      compareStr = Template.instance().data.lunch.mood || '';
    }

    return listItem === compareStr ? 'selected' : '';
  }
});
