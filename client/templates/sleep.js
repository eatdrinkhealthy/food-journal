Template.sleep.helpers({
  sleepQuality: function () {
    return JournalEntries.sleepQualityList;
  },

  sleepQualitySelected: function (listItem) {

    // if the sleep quality field is not set (undefined or null), use an empty string for comparison
    var compareStr = '';
    if (Template.instance().data.sleep) {
      compareStr = Template.instance().data.sleep.quality || '';
    }

    return listItem === compareStr ? 'selected' : '';
  }
});
