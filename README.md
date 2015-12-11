# food-journal

A simple journal application for practice with Meteor and Astronomy (a Meteor/MongoDB model layer).

### commit status (notes for an 'in progress' commit):
- working on passing sleep.quality to helper 'selected' in each loop, losing scope
one suggest work around: https://forums.meteor.com/t/pass-argument-to-helper-in-template-dynamic-call/3971

## Astronomy Technical Anamolies seen (do further research / testing)
- slug, methodName wasn't firing. had to sort of hard wire this by adding a beforeSave event and calling generateSlug()
    * see code / comments in models/journal_entries.js
    * note, slug code was removed (wasn't being used after adding other functionality)
- TBD, potential suggestion for jagi:astronomy
    * when doing validation of all fields, the error.reason is an object (representing a list of errors)
    * what is the convention of the error object (from a thrown execption)? Is the reason supposed to be a string?
       * if so, astro should probably use a concatenated string for reason instead of an object and provide the validation error list/object via a property or method (so dislplaying error.reason will display correctly)   in this case alert(error.reason) displayed [object Object]

## Tech Notes
- audit-argument-checks
    * added the audit-argument-checks package, and tested adding an entry without doing checks. An exception was thrown, but the insert still succeeded.
- a lesson in throwing errors & catching exceptions (server & client side)
    *         // TODO: use callback in save, to verify save successful (see astronomy docs)
    *         // By calling save with a callback, it does not block the mongo collection,
    *         // and allows you to provide a more specific error message
    *         //
    *         // SIDENOTE: if an error is thrown in the callback, it is another fiber (outside the meteor
    *         // method), so actually throws the error server side, and not passed back to client.
    *         // Therefore, if you wrap the call with Meteor._wrapAsync(), and use a try catch, you
    *         // can catch the error yourself, and pass it back to client
    *         // http://stackoverflow.com/questions/19616776/writing-converting-meteor-synchronous-functions
    *         //
    *         // NOTE, this approach probably isn't really much better than just doing a try catch
    *         // around entry.save()   -in either case, you are catching the exception, and able to
    *         // return a customized error back to the client; the only difference 'may' be that
    *         // the mongo insert is not blocked
- Asking the server (collection)
    * I wanted to ask the server if an entry (of a date) for a user existed, so I could check when editing or creating an entry, to make sure a duplicate wasn't entered.
    * was very difficult to do, wasn't a simple way to do so via server method (ran in to asnyc issues)
    * ended up having to publish/subscribe to the whole collection
    * What is the best way to do this? (see TODO in create / edit entry code)
    * Meteor.call(), without providing a callbac, SHOULD be synchronous. When trying that, I get an undefined result.
- Moved common from fields for create and edit entry to a reusable template. The submit button for the form however is still in each edit and create form. Testing showed this to work, but may be a bad practice. smell?
- Rajit datepicker is initialized using the .rendered callback, which is deprecated since Meteor 1.04
  - but it doesn't behave properly when using onRendered, so keeping in on rendered for now
