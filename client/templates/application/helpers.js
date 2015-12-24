Template.registerHelper('errorClass', function (field) {
  return !!Session.get('journalEntryFormFieldErrors')[field] ? 'has-error' : '';
});

Template.registerHelper('errorMessage', function (field) {
  return Session.get('journalEntryFormFieldErrors')[field];
});


