# food-journal

A simple journal application for practice with Meteor and Astronomy (a Meteor/MongoDB model layer).

## Technical Anamolies seen (do further research / testing)
- slug, methodName wasn't firing. had to sort of hard wire this by adding a beforeSave event and calling generateSlug()
    * see code / comments in models/journal_entries.js
    * note, slug code was removed (wasn't being used after adding other functionality)
- audit-argument-checks
    * added the audit-argument-checks package, and tested adding an entry without doing checks. An exception was thrown, but the insert still succeeded.